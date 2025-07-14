"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
class AuthController {
    static async register(req, res) {
        try {
            const { name, email, password, phone } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({
                    success: false,
                    error: 'Name, email, and password are required'
                });
            }
            const result = await auth_service_1.AuthService.registerUser({ name, email, password, phone });
            if (result.success) {
                return res.status(201).json({
                    success: true,
                    data: {
                        user: result.user,
                        token: result.token
                    },
                    message: 'User registered successfully'
                });
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: result.error || 'Registration failed'
                });
            }
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: 'Registration failed'
            });
        }
    }
    static async sendLoginOTP(req, res) {
        try {
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({
                    success: false,
                    error: 'Email is required'
                });
            }
            const result = await auth_service_1.AuthService.sendLoginOTP(email);
            if (result.success) {
                return res.status(200).json({
                    success: true,
                    data: { message: result.message },
                    message: 'OTP sent successfully'
                });
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: result.error || 'Failed to send OTP'
                });
            }
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: 'Failed to send OTP'
            });
        }
    }
    static async verifyOTP(req, res) {
        try {
            const { email, otp } = req.body;
            if (!email || !otp) {
                return res.status(400).json({
                    success: false,
                    error: 'Email and OTP are required'
                });
            }
            const result = await auth_service_1.AuthService.verifyOTP(email, otp);
            if (result.success) {
                return res.status(200).json({
                    success: true,
                    data: {
                        user: result.user,
                        token: result.token
                    },
                    message: 'OTP verified successfully'
                });
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: result.error || 'OTP verification failed'
                });
            }
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: 'OTP verification failed'
            });
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    error: 'Email and password are required'
                });
            }
            const result = await auth_service_1.AuthService.loginUser(email, password);
            if (result.success) {
                return res.status(200).json({
                    success: true,
                    data: {
                        user: result.user,
                        token: result.token
                    },
                    message: 'Login successful'
                });
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: result.error || 'Login failed'
                });
            }
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                error: 'Invalid email or password'
            });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map