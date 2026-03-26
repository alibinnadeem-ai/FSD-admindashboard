import fs from 'node:fs';
import path from 'node:path';
import { Pool } from '@neondatabase/serverless';

const rootDir = process.cwd();

function readEnvValue(key) {
  const envPath = path.join(rootDir, '.env.local');
  if (!fs.existsSync(envPath)) return undefined;

  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const k = trimmed.slice(0, idx).trim();
    if (k !== key) continue;
    let v = trimmed.slice(idx + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    return v;
  }
  return undefined;
}

function stripInsertStatements(sqlText) {
  return sqlText.replace(/^\s*INSERT\s+INTO[\s\S]*?;\s*$/gim, '');
}

function splitSqlStatements(sqlText) {
  const statements = [];
  let current = '';
  let i = 0;
  let inSingle = false;
  let inDouble = false;
  let inLineComment = false;
  let inBlockComment = false;
  let dollarTag = null;

  while (i < sqlText.length) {
    const ch = sqlText[i];
    const next = sqlText[i + 1];

    if (inLineComment) {
      current += ch;
      if (ch === '\n') inLineComment = false;
      i += 1;
      continue;
    }

    if (inBlockComment) {
      current += ch;
      if (ch === '*' && next === '/') {
        current += '/';
        inBlockComment = false;
        i += 2;
      } else {
        i += 1;
      }
      continue;
    }

    if (!inSingle && !inDouble && !dollarTag && ch === '-' && next === '-') {
      current += '--';
      inLineComment = true;
      i += 2;
      continue;
    }

    if (!inSingle && !inDouble && !dollarTag && ch === '/' && next === '*') {
      current += '/*';
      inBlockComment = true;
      i += 2;
      continue;
    }

    if (!inSingle && !inDouble && ch === '$') {
      const m = sqlText.slice(i).match(/^\$[A-Za-z_][A-Za-z0-9_]*\$|^\$\$/);
      if (m) {
        const tag = m[0];
        if (!dollarTag) {
          dollarTag = tag;
          current += tag;
          i += tag.length;
          continue;
        }
        if (dollarTag === tag) {
          dollarTag = null;
          current += tag;
          i += tag.length;
          continue;
        }
      }
    }

    if (!inDouble && !dollarTag && ch === "'") {
      if (inSingle && next === "'") {
        current += "''";
        i += 2;
        continue;
      }
      inSingle = !inSingle;
      current += ch;
      i += 1;
      continue;
    }

    if (!inSingle && !dollarTag && ch === '"') {
      if (inDouble && next === '"') {
        current += '""';
        i += 2;
        continue;
      }
      inDouble = !inDouble;
      current += ch;
      i += 1;
      continue;
    }

    if (!inSingle && !inDouble && !dollarTag && ch === ';') {
      const trimmed = current.trim();
      if (trimmed) statements.push(trimmed + ';');
      current = '';
      i += 1;
      continue;
    }

    current += ch;
    i += 1;
  }

  const tail = current.trim();
  if (tail) statements.push(tail);
  return statements;
}

async function runQuery(client, sqlText, label) {
  try {
    await client.query(sqlText);
    console.log(`OK: ${label}`);
  } catch (error) {
    console.error(`FAILED: ${label}`);
    throw error;
  }
}

async function runSqlBatch(client, sqlText, label) {
  const statements = splitSqlStatements(sqlText);
  for (let idx = 0; idx < statements.length; idx += 1) {
    await runQuery(client, statements[idx], `${label} [${idx + 1}/${statements.length}]`);
  }
}

async function main() {
  const databaseUrl = process.env.DATABASE_URL || readEnvValue('DATABASE_URL');

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is missing. Set it in .env.local or environment variables.');
  }

  const pool = new Pool({ connectionString: databaseUrl });
  const client = await pool.connect();

  try {
    console.log('Connecting to database...');
    await runQuery(client, 'SELECT 1;', 'connection test');

    console.log('Resetting schemas for a fresh start...');
    await runQuery(
      client,
      `
DO $$
DECLARE
  rec RECORD;
BEGIN
  EXECUTE 'DROP SCHEMA IF EXISTS guestpass CASCADE';

  FOR rec IN
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public'
  LOOP
    EXECUTE format('DROP TABLE IF EXISTS public.%I CASCADE', rec.tablename);
  END LOOP;

  FOR rec IN
    SELECT sequence_name
    FROM information_schema.sequences
    WHERE sequence_schema = 'public'
  LOOP
    EXECUTE format('DROP SEQUENCE IF EXISTS public.%I CASCADE', rec.sequence_name);
  END LOOP;

  FOR rec IN
    SELECT t.typname
    FROM pg_type t
    JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE n.nspname = 'public' AND t.typtype = 'e'
  LOOP
    EXECUTE format('DROP TYPE IF EXISTS public.%I CASCADE', rec.typname);
  END LOOP;
END
$$;
`,
      'drop existing public/guestpass objects'
    );

    const dashboardSchemaPath = path.join(rootDir, 'neon-schema.sql');
    const guestpassSchemaPath = path.join(rootDir, 'fsdcity_guestpass_schema.sql');

    const dashboardSchema = stripInsertStatements(fs.readFileSync(dashboardSchemaPath, 'utf8'));
    const guestpassSchema = stripInsertStatements(fs.readFileSync(guestpassSchemaPath, 'utf8'));

    console.log('Applying dashboard schema (empty)...');
    await runSqlBatch(client, dashboardSchema, 'dashboard schema');

    await runQuery(client, 'SET search_path TO guestpass, public;', 'set search_path guestpass');

    console.log('Applying guestpass schema (empty)...');
    await runSqlBatch(client, guestpassSchema, 'guestpass schema');

    const { rows: tables } = await client.query(`
    SELECT schemaname, tablename
    FROM pg_tables
    WHERE schemaname IN ('public', 'guestpass')
    ORDER BY schemaname, tablename;
  `);

    if (tables.length > 0) {
      const tableList = tables
        .map((t) => `"${t.schemaname.replaceAll('"', '""')}"."${t.tablename.replaceAll('"', '""')}"`)
        .join(', ');

      console.log('Ensuring all tables are empty...');
      await runQuery(client, `TRUNCATE TABLE ${tableList} RESTART IDENTITY CASCADE;`, 'truncate all tables');
    }

    await runQuery(client, 'SET search_path TO public;', 'reset search_path to public');

    console.log('Fresh database setup completed successfully.');
    console.log(`Created ${tables.length} tables across public + guestpass schemas (all empty).`);
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error('\nDatabase initialization failed:', error?.message || error);
  process.exit(1);
});
