#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Venue Booking Backend...\n');

// Check if .env file exists
if (!fs.existsSync('.env')) {
  console.log('📝 Creating .env file...');
  fs.copyFileSync('.env.example', '.env');
  console.log('✅ .env file created. Please update it with your credentials.\n');
} else {
  console.log('✅ .env file already exists.\n');
}

// Check Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
if (majorVersion < 16) {
  console.error('❌ Node.js version 16 or higher is required. Current version:', nodeVersion);
  process.exit(1);
}
console.log('✅ Node.js version check passed:', nodeVersion);

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully.');
} catch (error) {
  console.error('❌ Failed to install dependencies:', error.message);
  process.exit(1);
}

// Check if PostgreSQL is available
console.log('\n🗄️  Checking PostgreSQL connection...');
try {
  require('dotenv').config();
  const { Pool } = require('pg');
  
  const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: 'postgres', // Connect to default database first
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
  });

  pool.query('SELECT NOW()', (err, result) => {
    if (err) {
      console.error('❌ PostgreSQL connection failed:', err.message);
      console.log('\n📋 Please ensure PostgreSQL is running and credentials are correct in .env file.');
      process.exit(1);
    } else {
      console.log('✅ PostgreSQL connection successful.');
      
      // Create database if it doesn't exist
      const dbName = process.env.DB_NAME || 'venue_booking';
      pool.query(`SELECT 1 FROM pg_database WHERE datname = '${dbName}'`, (err, result) => {
        if (err) {
          console.error('❌ Error checking database:', err.message);
          process.exit(1);
        }
        
        if (result.rows.length === 0) {
          console.log(`📝 Creating database: ${dbName}`);
          pool.query(`CREATE DATABASE ${dbName}`, (err) => {
            if (err) {
              console.error('❌ Failed to create database:', err.message);
              process.exit(1);
            }
            console.log('✅ Database created successfully.');
            runMigrations();
          });
        } else {
          console.log('✅ Database already exists.');
          runMigrations();
        }
      });
    }
  });
} catch (error) {
  console.error('❌ Error setting up database:', error.message);
  console.log('\n📋 Please install PostgreSQL and update .env file with correct credentials.');
  process.exit(1);
}

function runMigrations() {
  console.log('\n🔧 Running database migrations...');
  try {
    execSync('node scripts/migrate.js', { stdio: 'inherit' });
    console.log('✅ Database migrations completed.');
    
    // Ask if user wants to seed the database
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('\n🌱 Do you want to seed the database with sample data? (y/N): ', (answer) => {
      if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
        console.log('\n🌱 Seeding database...');
        try {
          execSync('node scripts/seed.js', { stdio: 'inherit' });
          console.log('✅ Database seeded successfully.');
        } catch (error) {
          console.error('❌ Failed to seed database:', error.message);
        }
      }
      
      console.log('\n🎉 Setup completed successfully!');
      console.log('\n📋 Next steps:');
      console.log('1. Update .env file with your actual credentials');
      console.log('2. Run "npm run dev" to start the development server');
      console.log('3. Visit http://localhost:5000 to test the API');
      console.log('\n📚 Check README.md for API documentation and usage examples.');
      
      rl.close();
      process.exit(0);
    });
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n👋 Setup interrupted. You can run this script again anytime.');
  process.exit(0);
}); 