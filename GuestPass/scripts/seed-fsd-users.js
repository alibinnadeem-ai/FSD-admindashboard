const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const fs = require('fs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const SALT_ROUNDS = 12;

function generatePassword(length = 8) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

const usersToSeed = [
  { name: 'Brigadier Tippu Karim (Retd.)', email: 'tippu.karim@fsdcity.pk', role: 'executive', title: 'CEO', position: 'ceo', department: 'Head Office Lahore' },
  { name: 'Saeen Irfan', email: 'saeen.irfan@fsdcity.pk', role: 'executive', title: 'Head of Accounts & Finance', position: 'cfo', department: 'Head Office Lahore' },
  { name: 'Faisal Luqman', email: 'faisal.luqman@fsdcity.pk', role: 'executive', title: 'General Manager Finance', position: 'md_partner', department: 'Head Office Lahore' },
  { name: 'Usman Niaz', email: 'usman.niaz@fsdcity.pk', role: 'executive', title: 'CSD Head', position: 'director_operations', department: 'Head Office Lahore' },
  { name: 'Waseem Sadiq', email: 'waseem.sadiq@fsdcity.pk', role: 'executive', title: 'Digital Head', position: 'tech_consultant', department: 'Head Office Lahore' },

  { name: 'Col. Irfan', email: 'col.irfan@fsdcity.pk', role: 'executive', title: 'Head of Administration', position: 'director_faisalabad', department: 'Site Office Faisalabad' },
  { name: 'Malik Younas', email: 'malik.younas@fsdcity.pk', role: 'executive', title: 'Head of Sales', position: 'consultant', department: 'Site Office Faisalabad' },

  { name: 'Muhammad Bin Waris Gillani', email: 'muhammad.gillani@fsdcity.pk', role: 'executive', title: 'Executive Director', position: 'chairman_partner', department: 'Executive Directors' },
  { name: 'Mian Muhammad Ali Moeen', email: 'ali.moeen@fsdcity.pk', role: 'executive', title: 'Executive Director', position: 'chairman_partner', department: 'Executive Directors' },

  { name: 'Khalid Noon', email: 'khalid.noon@fsdcity.pk', role: 'executive', title: 'Head of PND', position: 'md_partner', department: 'Joined Departments - GCK' },
  { name: 'Col. Mazhar', email: 'col.mazhar@fsdcity.pk', role: 'executive', title: 'Head of Land', position: 'consultant', department: 'Joined Departments - GCK' },
  { name: 'Amjad Lawyer', email: 'amjad.lawyer@fsdcity.pk', role: 'executive', title: 'Head of Legal', position: 'consultant', department: 'Joined Departments - GCK' },
  { name: 'Rashid Thakur', email: 'rashid.thakur@fsdcity.pk', role: 'executive', title: 'Head of Procurement', position: 'consultant', department: 'Joined Departments - GCK' },
  { name: 'Abdul Rehman', email: 'abdul.rehman@fsdcity.pk', role: 'executive', title: 'Head of IT', position: 'tech_consultant', department: 'Joined Departments - GCK' },
  { name: 'Huda Javed', email: 'huda.javed@fsdcity.pk', role: 'executive', title: 'Head of HR', position: 'consultant', department: 'Joined Departments - GCK' },
  { name: 'Sophia Qadeer', email: 'sophia.qadeer@fsdcity.pk', role: 'executive', title: 'Head of Marketing', position: 'consultant', department: 'Joined Departments - GCK' },

  // System Roles
  { name: 'Staff', email: 'staff@fsdcity.pk', role: 'staff', department: 'System' },
  { name: 'Security Guard', email: 'guard@fsdcity.pk', role: 'guard', department: 'System' },
  { name: 'Receptionist', email: 'receptionist@fsdcity.pk', role: 'receptionist', department: 'System' },
  { name: 'System Admin', email: 'admin@fsdcity.pk', role: 'admin', department: 'System' }
];

async function seedDatabase() {
  const mdContent = ['# FSD City Admin Dashboard - New Credentials\\n\\n| Name | Email | Role | Title | Password |\\n|---|---|---|---|---|'];
  
  const client = await pool.connect();
  
  try {
    console.log('Starting database seeding...');
    await client.query('BEGIN');
    
    // Switch to guestpass schema
    await client.query('SET search_path TO guestpass, public');
    
    for (const user of usersToSeed) {
      const password = generatePassword(10);
      const hash = await bcrypt.hash(password, SALT_ROUNDS);
      
      console.log(`Inserting user: ${user.name}...`);
      
      const insertUserQuery = `
        INSERT INTO users (email, password_hash, full_name, role, department, is_active)
        VALUES ($1, $2, $3, $4, $5, true)
        RETURNING id;
      `;
      const userRes = await client.query(insertUserQuery, [user.email, hash, user.name, user.role, user.department]);
      const userId = userRes.rows[0].id;

      if (user.role === 'executive') {
        const insertExecQuery = `
          INSERT INTO executives (user_id, title, position, is_active)
          VALUES ($1, $2, $3, true)
          RETURNING id;
        `;
        const execRes = await client.query(insertExecQuery, [userId, user.title, user.position]);
        const execId = execRes.rows[0].id;
        
        await client.query('UPDATE users SET executive_id = $1 WHERE id = $2', [execId, userId]);
      }
      
      mdContent.push(`| ${user.name} | ${user.email} | ${user.role} | ${user.title || 'N/A'} | \`${password}\` |`);
    }
    
    await client.query('COMMIT');
    console.log('Successfully seeded all users.');
    
    const mdTable = mdContent.join('\\n');
    fs.writeFileSync(path.join(__dirname, '../../FSD-CREDENTIALS.md'), mdTable);
    console.log('Wrote credentials to FSD-CREDENTIALS.md');
    
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error seeding database:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

seedDatabase();
