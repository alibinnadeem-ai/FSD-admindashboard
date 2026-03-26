const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const fs = require('fs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const SALT_ROUNDS = 12;

const usersToSeed = [
  { name: 'Brigadier Tippu Karim (Retd.)', email: 'tippu.karim@fsdcity.pk', role: 'executive', title: 'CEO', position: 'ceo', department: 'Head Office Lahore', password: 'tippu123' },
  { name: 'Saeen Irfan', email: 'saeen.irfan@fsdcity.pk', role: 'executive', title: 'Head of Accounts & Finance', position: 'cfo', department: 'Head Office Lahore', password: 'irfan123' },
  { name: 'Faisal Luqman', email: 'faisal.luqman@fsdcity.pk', role: 'executive', title: 'General Manager Finance', position: 'md_partner', department: 'Head Office Lahore', password: 'luqman123' },
  { name: 'Usman Niaz', email: 'usman.niaz@fsdcity.pk', role: 'executive', title: 'CSD Head', position: 'director_operations', department: 'Head Office Lahore', password: 'usman123' },
  { name: 'Waseem Sadiq', email: 'waseem.sadiq@fsdcity.pk', role: 'executive', title: 'Digital Head', position: 'tech_consultant', department: 'Head Office Lahore', password: 'waseem123' },

  { name: 'Col. Irfan', email: 'col.irfan@fsdcity.pk', role: 'executive', title: 'Head of Administration', position: 'director_faisalabad', department: 'Site Office Faisalabad', password: 'colirfan123' },
  { name: 'Malik Younas', email: 'malik.younas@fsdcity.pk', role: 'executive', title: 'Head of Sales', position: 'consultant', department: 'Site Office Faisalabad', password: 'younas123' },

  { name: 'Muhammad Bin Waris Gillani', email: 'muhammad.gillani@fsdcity.pk', role: 'executive', title: 'Executive Director', position: 'chairman_partner', department: 'Executive Directors', password: 'gillani123' },
  { name: 'Mian Muhammad Ali Moeen', email: 'ali.moeen@fsdcity.pk', role: 'executive', title: 'Executive Director', position: 'chairman_partner', department: 'Executive Directors', password: 'moeen123' },

  { name: 'Khalid Noon', email: 'khalid.noon@fsdcity.pk', role: 'executive', title: 'Head of PND', position: 'md_partner', department: 'Joined Departments - GCK', password: 'khalid123' },
  { name: 'Col. Mazhar', email: 'col.mazhar@fsdcity.pk', role: 'executive', title: 'Head of Land', position: 'consultant', department: 'Joined Departments - GCK', password: 'mazhar123' },
  { name: 'Amjad Lawyer', email: 'amjad.lawyer@fsdcity.pk', role: 'executive', title: 'Head of Legal', position: 'consultant', department: 'Joined Departments - GCK', password: 'amjad123' },
  { name: 'Rashid Thakur', email: 'rashid.thakur@fsdcity.pk', role: 'executive', title: 'Head of Procurement', position: 'consultant', department: 'Joined Departments - GCK', password: 'rashid123' },
  { name: 'Abdul Rehman', email: 'abdul.rehman@fsdcity.pk', role: 'executive', title: 'Head of IT', position: 'tech_consultant', department: 'Joined Departments - GCK', password: 'abdul123' },
  { name: 'Huda Javed', email: 'huda.javed@fsdcity.pk', role: 'executive', title: 'Head of HR', position: 'consultant', department: 'Joined Departments - GCK', password: 'huda123' },
  { name: 'Sophia Qadeer', email: 'sophia.qadeer@fsdcity.pk', role: 'executive', title: 'Head of Marketing', position: 'consultant', department: 'Joined Departments - GCK', password: 'sophia123' },

  // System Roles
  { name: 'Staff', email: 'staff@fsdcity.pk', role: 'staff', department: 'System', password: 'staff123' },
  { name: 'Security Guard', email: 'guard@fsdcity.pk', role: 'guard', department: 'System', password: 'guard123' },
  { name: 'Receptionist', email: 'receptionist@fsdcity.pk', role: 'receptionist', department: 'System', password: 'reception123' },
  { name: 'System Admin', email: 'admin@fsdcity.pk', role: 'admin', department: 'System', password: 'admin123' }
];

async function seedDatabase() {
  const mdContent = ['# FSD City Admin Dashboard - New Credentials\\n\\n| Name | Email | Role | Title | Password |\\n|---|---|---|---|---|'];
  
  const client = await pool.connect();
  
  try {
    console.log('Starting database seeding...');
    await client.query('BEGIN');
    
    // Switch to guestpass schema
    await client.query('SET search_path TO guestpass, public');

    console.log('Clearing existing users to prevent duplicate errors...');
    await client.query('TRUNCATE TABLE users CASCADE');
    
    for (const user of usersToSeed) {
      const password = user.password;
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
