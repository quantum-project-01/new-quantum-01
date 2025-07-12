# Email OTP Setup Guide

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/quantum_sports"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-here"

# Email Configuration (for OTP)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
```

## Gmail App Password Setup

For Gmail, you need to use an App Password, not your regular password:

1. Go to your Google Account settings: https://myaccount.google.com/
2. Enable 2-factor authentication if not already enabled
3. Go to Security → App passwords
4. Generate an App Password for your application
5. Use this App Password as `EMAIL_PASSWORD` in your `.env` file

## Database Migration

After updating the Prisma schema, run:

```bash
npx prisma generate
npx prisma db push
```

## API Endpoints

### OTP Login Flow

1. **Send OTP**: `POST /api/auth/send-otp`
   ```json
   {
     "email": "user@example.com"
   }
   ```

2. **Verify OTP**: `POST /api/auth/verify-otp`
   ```json
   {
     "email": "user@example.com",
     "otp": "123456"
   }
   ```

### Traditional Login

- **Login**: `POST /api/auth/login`
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

### Registration

- **Register**: `POST /api/auth/register`
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "+1234567890"
  }
  ```

## Features

- OTP expires after 10 minutes
- OTP is cleared after successful verification
- JWT token is generated upon successful OTP verification
- Email template with professional styling
- Error handling for invalid/expired OTPs 