import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password, phone } = req.body;
      
      if (!name || !email || !password) {
        return res.status(400).json({ 
          success: false, 
          error: 'Name, email, and password are required' 
        });
      }

      const result = await AuthService.registerUser({ name, email, password, phone });
      
      if (result.success) {
        res.status(201).json({
          success: true,
          data: {
            user: result.user,
            token: result.token
          },
          message: 'User registered successfully'
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.error || 'Registration failed'
        });
      }
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: 'Registration failed' 
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
        res.status(200).json({
          success: true,
          data: { message: result.message },
          message: 'OTP sent successfully'
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.error || 'Failed to send OTP'
        });
      }
    } catch (error) {
      res.status(500).json({ 
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
        res.status(200).json({
          success: true,
          data: {
            user: result.user,
            token: result.token
          },
          message: 'OTP verified successfully'
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.error || 'OTP verification failed'
        });
      }
    } catch (error) {
      res.status(500).json({ 
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
        res.status(200).json({
          success: true,
          data: {
            user: result.user,
            token: result.token
          },
          message: 'Login successful'
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.error || 'Login failed'
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        error: 'Invalid email or password'
      });
    }
  }
} 