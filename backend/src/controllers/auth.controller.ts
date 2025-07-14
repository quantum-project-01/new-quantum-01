import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      console.log('===== Registration Request Debug =====');
      console.log('Request Body:', JSON.stringify(req.body, null, 2));
      console.log('Request Headers:', JSON.stringify(req.headers, null, 2));

      const { name, email, password, phone } = req.body;
      
      // Comprehensive input validation
      const validationErrors: string[] = [];
      if (!name) validationErrors.push('Name is required');
      if (!email) validationErrors.push('Email is required');
      if (!password) validationErrors.push('Password is required');
      
      if (validationErrors.length > 0) {
        console.log('Validation Errors:', validationErrors);
        return res.status(400).json({ 
          success: false, 
          errors: validationErrors,
          message: 'Invalid input' 
        });
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        console.log('Invalid email format:', email);
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid email format',
          details: { email }
        });
      }

      // Password strength validation
      if (password.length < 6) {
        console.log('Password too short:', password.length);
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 6 characters long'
        });
      }

      try {
        const result = await AuthService.registerUser({ name, email, password, phone });
        
        if (result.success) {
          console.log('User registered successfully:', result.user);
          return res.status(201).json({
            success: true,
            data: {
              user: result.user,
              token: result.token
            },
            message: 'User registered successfully'
          });
        } else {
          console.log('Registration failed:', result.error, 'Details:', result.details);
          return res.status(400).json({
            success: false,
            message: result.error || 'Registration failed',
            details: result.details || { name, email, phoneProvided: !!phone }
          });
        }
      } catch (serviceError) {
        console.error('Service registration error:', serviceError);
        return res.status(500).json({
          success: false,
          message: 'Internal server error during registration',
          details: serviceError instanceof Error ? serviceError.message : 'Unknown error'
        });
      }
    } catch (error) {
      console.error('Unexpected registration error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Registration failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  static async sendLoginOTP(req: Request, res: Response) {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ 
          success: false, 
          error: 'Email is required' 
        });
      }

      const result = await AuthService.sendLoginOTP(email);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: { message: result.message },
          message: 'OTP sent successfully'
        });
      } else {
        return res.status(400).json({
          success: false,
          message: result.error || 'Failed to send OTP'
        });
      }
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to send OTP' 
      });
    }
  }

  static async verifyOTP(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;
      
      if (!email || !otp) {
        return res.status(400).json({ 
          success: false, 
          error: 'Email and OTP are required' 
        });
      }

      const result = await AuthService.verifyOTP(email, otp);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: {
            user: result.user,
            token: result.token
          },
          message: 'OTP verified successfully'
        });
      } else {
        return res.status(400).json({
          success: false,
          message: result.error || 'OTP verification failed'
        });
      }
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        error: 'OTP verification failed' 
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ 
          success: false, 
          error: 'Email and password are required' 
        });
      }

      const result = await AuthService.loginUser(email, password);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          data: {
            user: result.user,
            token: result.token
          },
          message: 'Login successful'
        });
      } else {
        return res.status(400).json({
          success: false,
          message: result.error || 'Login failed'
        });
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email or password'
      });
    }
  }
} 