# Email OTP Login Implementation

## Overview

This implementation adds email-based OTP (One-Time Password) login functionality to the Quantum Sports platform. Users can now login using either traditional password authentication or OTP-based authentication.

## Features

### Backend Features
- ✅ Email OTP generation and sending
- ✅ OTP verification with expiration (10 minutes)
- ✅ Database storage for OTP and expiry
- ✅ JWT token generation upon successful OTP verification
- ✅ Professional email template
- ✅ Error handling for invalid/expired OTPs
- ✅ Traditional password login still available

### Frontend Features
- ✅ Modern, responsive OTP login UI
- ✅ Two-step login process (email → OTP)
- ✅ Real-time validation and error handling
- ✅ Loading states and user feedback
- ✅ Navigation between password and OTP login
- ✅ Auto-focus and proper input formatting

## Backend Implementation

### Database Schema Updates
```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  phone     String?
  otp       String?      // New: OTP field
  otpExpiry DateTime?    // New: OTP expiry timestamp
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### New API Endpoints

#### 1. Send OTP
```http
POST /api/auth/send-otp
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent successfully"
}
```

#### 2. Verify OTP
```http
POST /api/auth/verify-otp
Content-Type: application/json

{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-id",
      "name": "John Doe",
      "email": "user@example.com"
    },
    "token": "jwt-token-here"
  }
}
```

### Email Service
- Uses Nodemailer with Gmail SMTP
- Professional HTML email template
- 6-digit OTP generation
- 10-minute expiration

## Frontend Implementation

### New Components

#### OTPLoginPage (`/src/pages/auth/OTPLoginPage.tsx`)
- Two-step login process
- Email input → OTP input
- Real-time validation
- Loading states
- Error handling

#### Updated LoginPage (`/src/pages/auth/LoginPage.tsx`)
- Modern login form
- Link to OTP login
- Traditional password authentication

### New Routes
- `/login-otp` - OTP-based login page

### Updated Services
- `authService.sendLoginOTP()` - Send OTP to email
- `authService.verifyOTP()` - Verify OTP and get token

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install nodemailer @types/nodemailer
```

### 2. Environment Configuration
Create `.env` file in backend directory:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/quantum_sports"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-here"

# Email Configuration
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
```

### 3. Gmail App Password Setup
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Enable 2-factor authentication
3. Go to Security → App passwords
4. Generate app password for your application
5. Use this password as `EMAIL_PASSWORD`

### 4. Database Migration
```bash
cd backend
npx prisma generate
npx prisma db push
```

## Usage Flow

### OTP Login Flow
1. User visits `/login-otp`
2. Enters email address
3. Clicks "Send OTP"
4. Receives email with 6-digit code
5. Enters OTP in the form
6. Clicks "Verify OTP"
7. Gets logged in and redirected to dashboard

### Traditional Login Flow
1. User visits `/login`
2. Enters email and password
3. Clicks "Sign in"
4. Gets logged in and redirected to dashboard

## Security Features

- **OTP Expiration**: 10-minute timeout
- **One-time Use**: OTP is cleared after successful verification
- **Rate Limiting**: Can be added to prevent abuse
- **Email Validation**: Ensures user exists before sending OTP
- **JWT Tokens**: Secure session management

## Error Handling

### Backend Errors
- User not found
- Invalid/expired OTP
- Email sending failures
- Database errors

### Frontend Errors
- Network errors
- Invalid input validation
- Loading state management
- User-friendly error messages

## Email Template

The email includes:
- Professional styling
- Clear OTP display
- Expiration warning
- Security notice
- Branded header

## Future Enhancements

1. **Rate Limiting**: Prevent OTP abuse
2. **SMS OTP**: Add SMS as alternative
3. **Remember Device**: Skip OTP for trusted devices
4. **Backup Codes**: Generate backup codes for account recovery
5. **Analytics**: Track OTP usage and success rates

## Testing

### Manual Testing
1. Register a new user
2. Try OTP login with valid email
3. Try OTP login with invalid email
4. Try OTP verification with invalid code
5. Try OTP verification after expiration
6. Test traditional password login

### API Testing
```bash
# Send OTP
curl -X POST http://localhost:3001/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'

# Verify OTP
curl -X POST http://localhost:3001/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "otp": "123456"}'
```

## Troubleshooting

### Common Issues

1. **Email not sending**
   - Check Gmail app password
   - Verify email credentials in .env
   - Check Gmail security settings

2. **OTP not working**
   - Check database connection
   - Verify Prisma schema migration
   - Check server logs for errors

3. **Frontend errors**
   - Check API endpoint URLs
   - Verify CORS configuration
   - Check browser console for errors

## Files Modified/Created

### Backend
- `prisma/schema.prisma` - Added OTP fields
- `src/services/email.service.ts` - New email service
- `src/services/auth.service.ts` - Updated with OTP methods
- `src/controllers/auth.controller.ts` - Added OTP endpoints
- `src/routes/auth.routes.ts` - Added OTP routes
- `EMAIL_SETUP.md` - Setup instructions

### Frontend
- `src/services/authService.ts` - Added OTP methods
- `src/pages/auth/OTPLoginPage.tsx` - New OTP login page
- `src/pages/auth/LoginPage.tsx` - Updated with OTP link
- `src/App.tsx` - Added OTP route

This implementation provides a secure, user-friendly OTP-based authentication system while maintaining backward compatibility with traditional password login. 