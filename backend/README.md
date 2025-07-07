# Venue Booking Backend API

A production-ready backend API for a venue/event booking platform built with Node.js, Express.js, and PostgreSQL.

## 🚀 Features

- **JWT Authentication** - Secure user authentication with role-based access control
- **Venue Management** - CRUD operations for venues with admin approval workflow
- **Slot Management** - Time slot booking system with conflict prevention
- **Payment Integration** - Razorpay integration for secure payments
- **File Upload** - Cloudinary integration for image uploads
- **Admin Panel** - Administrative features for venue approval and system management
- **Role-based Access** - User, Partner, and Admin roles with appropriate permissions

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Cloudinary
- **Payment**: Razorpay
- **Validation**: express-validator
- **Security**: Helmet, CORS, Rate Limiting

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- Cloudinary account
- Razorpay account

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=venue_booking
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRES_IN=7d
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # Razorpay Configuration
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

4. **Database Setup**
   ```bash
   # Create database
   createdb venue_booking
   
   # Run migrations
   npm run db:migrate
   
   # Seed database (optional)
   npm run db:seed
   ```

5. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123!",
  "role": "user" // optional: user, partner, admin
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123!"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Venue Endpoints

#### Create Venue (Partner/Admin)
```http
POST /api/venues
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "name": "Elite Sports Complex",
  "location": "Koramangala, Bangalore",
  "sport_type": "Badminton",
  "price_per_hr": 800,
  "description": "Premium badminton courts",
  "contact_phone": "+91-9876543210",
  "amenities": ["AC", "Parking", "Washroom"],
  "images": [file1, file2] // multipart files
}
```

#### Get All Venues
```http
GET /api/venues?sport_type=Badminton&location=Bangalore&limit=20&offset=0
```

#### Get Venue by ID
```http
GET /api/venues/:id
```

#### Update Venue (Owner/Admin)
```http
PUT /api/venues/:id
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

#### Get My Venues (Partner)
```http
GET /api/venues/my-venues
Authorization: Bearer <token>
```

### Booking Endpoints

#### Create Booking
```http
POST /api/bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "slot_id": 1,
  "amount_paid": 800
}
```

#### Get My Bookings
```http
GET /api/bookings/my-bookings
Authorization: Bearer <token>
```

#### Verify Payment
```http
POST /api/bookings/:id/verify-payment
Authorization: Bearer <token>
Content-Type: application/json

{
  "razorpay_order_id": "order_xyz",
  "razorpay_payment_id": "pay_abc",
  "razorpay_signature": "signature_123"
}
```

### Admin Endpoints

#### Get Pending Venues
```http
GET /api/admin/venues/pending
Authorization: Bearer <admin_token>
```

#### Approve/Reject Venue
```http
PUT /api/admin/venues/:id/approval
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "approved": true,
  "admin_notes": "Excellent facility"
}
```

#### Get Dashboard Stats
```http
GET /api/admin/dashboard
Authorization: Bearer <admin_token>
```

## 🏗️ Project Structure

```
backend/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── venueController.js   # Venue management
│   ├── bookingController.js # Booking operations
│   └── adminController.js   # Admin operations
├── middleware/
│   ├── auth.js             # JWT authentication
│   ├── validation.js       # Input validation
│   ├── errorHandler.js     # Error handling
│   └── notFound.js         # 404 handler
├── models/
│   ├── User.js             # User model
│   ├── Venue.js            # Venue model
│   ├── Slot.js             # Slot model
│   └── Booking.js          # Booking model
├── routes/
│   ├── auth.js             # Auth routes
│   ├── venues.js           # Venue routes
│   ├── bookings.js         # Booking routes
│   ├── users.js            # User routes
│   └── admin.js            # Admin routes
├── scripts/
│   ├── migrate.js          # Database migration
│   └── seed.js             # Database seeding
├── utils/
│   ├── cloudinary.js       # Image upload utility
│   └── payment.js          # Payment processing
├── app.js                  # Express app setup
├── server.js               # Server entry point
└── package.json
```

## 🔐 Authentication & Authorization

The API uses JWT tokens for authentication with three user roles:

- **User**: Can book venues and manage their bookings
- **Partner**: Can create and manage venues, view bookings for their venues
- **Admin**: Full access to all resources, can approve venues

## 🗄️ Database Schema

### Users Table
- `id` (Primary Key)
- `name`, `email`, `password_hash`
- `role` (user, partner, admin)
- `created_at`, `updated_at`, `deleted_at`

### Venues Table
- `id` (Primary Key)
- `owner_id` (Foreign Key to Users)
- `name`, `location`, `sport_type`, `price_per_hr`
- `images` (JSON), `amenities` (JSON)
- `approved`, `admin_notes`, `approved_at`
- `created_at`, `updated_at`, `deleted_at`

### Slots Table
- `id` (Primary Key)
- `venue_id` (Foreign Key to Venues)
- `date`, `start_time`, `end_time`
- `is_booked`
- `created_at`, `updated_at`

### Bookings Table
- `id` (Primary Key)
- `user_id` (Foreign Key to Users)
- `slot_id` (Foreign Key to Slots)
- `amount_paid`, `payment_status`, `payment_transaction_id`
- `status` (pending, confirmed, cancelled, completed)
- `created_at`, `updated_at`

## 🧪 Testing

### Sample User Accounts (After Seeding)
- **Admin**: admin@venueapp.com / Admin123!
- **Partner**: john@partner.com / Partner123!
- **User**: alice@user.com / User123!

### API Testing
Use tools like Postman or curl to test the API endpoints. Import the collection from `/docs/postman_collection.json` (if available).

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
DB_URL=postgresql://user:password@host:port/database
JWT_SECRET=your_production_secret
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

### Production Checklist
- [ ] Set strong JWT secret
- [ ] Configure production database
- [ ] Set up Cloudinary account
- [ ] Configure Razorpay account
- [ ] Set up SSL certificate
- [ ] Configure domain and CORS
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@venueapp.com or create an issue in the repository. 
 