import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { EmailService } from './email.service';

const prisma = new PrismaClient();

export class AuthService {
  static async registerUser(data: { name: string; email: string; password: string; phone?: string }) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      
      const userData: any = {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      };

      if (data.phone) {
        userData.phone = data.phone;
      }

      const user = await prisma.user.create({
        data: userData,
      });

      // Generate JWT token for the newly registered user
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env['JWT_SECRET'] || 'your-secret-key',
        { expiresIn: '24h' }
      );

      return { 
        success: true, 
        user: { id: user.id, name: user.name, email: user.email },
        token 
      };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  }

  static async sendLoginOTP(email: string) {
    try {
      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return { success: false, error: 'User not found' };
      }

      // Generate OTP
      const otp = EmailService.generateOTP();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // Save OTP to database
      await prisma.user.update({
        where: { email },
        data: {
          otp,
          otpExpiry,
        } as any,
      });

      // Send OTP via email
      const emailSent = await EmailService.sendOTP(email, otp);
      
      if (!emailSent) {
        return { success: false, error: 'Failed to send OTP email' };
      }

      return { success: true, message: 'OTP sent successfully' };
    } catch (error) {
      return { success: false, error: 'Failed to send OTP' };
    }
  }

  static async verifyOTP(email: string, otp: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return { success: false, error: 'User not found' };
      }

      // Check if OTP matches and is not expired
      const userWithOTP = user as any;
      if (userWithOTP.otp !== otp || !userWithOTP.otpExpiry || userWithOTP.otpExpiry < new Date()) {
        return { success: false, error: 'Invalid or expired OTP' };
      }

      // Clear OTP after successful verification
      await prisma.user.update({
        where: { email },
        data: {
          otp: null,
          otpExpiry: null,
        } as any,
      });

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env['JWT_SECRET'] || 'your-secret-key',
        { expiresIn: '24h' }
      );

      return {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      };
    } catch (error) {
      return { success: false, error: 'OTP verification failed' };
    }
  }

  static async loginUser(email: string, password: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env['JWT_SECRET'] || 'your-secret-key',
        { expiresIn: '24h' }
      );

      return {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Login failed' };
    }
  }
} 