import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/stylemeup');
    
    // Check if admin exists
    let admin = await User.findOne({ email: 'admin@stylemeup.com' });
    
    if (admin) {
      console.log('Admin already exists.');
    } else {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash('admin123', salt);
      
      admin = await User.create({
        name: 'Admin User',
        email: 'admin@stylemeup.com',
        passwordHash,
        role: 'admin'
      });
      console.log('Admin user created successfully!');
    }
    
    console.log('Credentials:');
    console.log('Email: admin@stylemeup.com');
    console.log('Password: admin123');
    
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();
