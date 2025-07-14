"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const email_service_1 = require("./email.service");
const prisma = new client_1.PrismaClient();
class AuthService {
    static async registerUser(data) {
        try {
            const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
            const userData = {
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
            const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env['JWT_SECRET'] || 'your-secret-key', { expiresIn: '24h' });
            return {
                success: true,
                user: { id: user.id, name: user.name, email: user.email },
                token
            };
        }
        catch (error) {
            return { success: false, error: 'Registration failed' };
        }
    }
    static async sendLoginOTP(email) {
        try {
            const user = await prisma.user.findUnique({
                where: { email },
            });
            if (!user) {
                return { success: false, error: 'User not found' };
            }
            const otp = email_service_1.EmailService.generateOTP();
            const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
            await prisma.user.update({
                where: { email },
                data: {
                    otp,
                    otpExpiry,
                },
            });
            const emailSent = await email_service_1.EmailService.sendOTP(email, otp);
            if (!emailSent) {
                return { success: false, error: 'Failed to send OTP email' };
            }
            return { success: true, message: 'OTP sent successfully' };
        }
        catch (error) {
            return { success: false, error: 'Failed to send OTP' };
        }
    }
    static async verifyOTP(email, otp) {
        try {
            const user = await prisma.user.findUnique({
                where: { email },
            });
            if (!user) {
                return { success: false, error: 'User not found' };
            }
            const userWithOTP = user;
            if (userWithOTP.otp !== otp || !userWithOTP.otpExpiry || userWithOTP.otpExpiry < new Date()) {
                return { success: false, error: 'Invalid or expired OTP' };
            }
            await prisma.user.update({
                where: { email },
                data: {
                    otp: null,
                    otpExpiry: null,
                },
            });
            const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env['JWT_SECRET'] || 'your-secret-key', { expiresIn: '24h' });
            return {
                success: true,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                token,
            };
        }
        catch (error) {
            return { success: false, error: 'OTP verification failed' };
        }
    }
    static async loginUser(email, password) {
        try {
            const user = await prisma.user.findUnique({
                where: { email },
            });
            if (!user) {
                throw new Error('User not found');
            }
            const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }
            const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env['JWT_SECRET'] || 'your-secret-key', { expiresIn: '24h' });
            return {
                success: true,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                token,
            };
        }
        catch (error) {
            return { success: false, error: error instanceof Error ? error.message : 'Login failed' };
        }
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map