# Quantum - Sports Venue Booking Platform

Quantum is a comprehensive web platform for booking sports venues, events, and purchasing sports equipment. Built with React, TypeScript, and Tailwind CSS.

## Features

### Customer Features
- **Venue Booking**: Browse and book sports venues with real-time availability
- **Event Participation**: Join sports events and tournaments
- **E-commerce**: Shop for sports equipment with cart and payment functionality
- **Subscription Plans**: Lite (₹5,000-6,000) and Pro (₹10,000-12,000) monthly subscriptions
- **User Profile**: Manage bookings, subscriptions, and order history

### Partner Features
- **Venue Management**: Add and manage sports venues
- **Dashboard**: Track bookings and earnings with detailed analytics
- **Subscription Options**: Fixed subscription (₹5k/month/turf) or Revenue Share model
- **Booking Management**: View and manage venue bookings

### Admin Features
- **Venue Approval**: Approve/reject partner venue listings
- **User Management**: Manage users and partners
- **Analytics Dashboard**: View platform-wide statistics
- **Content Management**: Manage policies and terms

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router v6
- **Form Handling**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components (ProtectedRoute, etc.)
│   ├── auth/           # Authentication components
│   ├── venue/          # Venue-related components
│   ├── booking/        # Booking components
│   ├── partner/        # Partner dashboard components
│   ├── admin/          # Admin panel components
│   └── layout/         # Layout components (Header, Footer)
├── pages/              # Page components
│   ├── auth/           # Authentication pages
│   ├── venue/          # Venue pages
│   ├── booking/        # Booking pages
│   ├── partner/        # Partner pages
│   ├── admin/          # Admin pages
│   └── profile/        # User profile pages
├── services/           # API service functions
├── store/              # Zustand stores
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── assets/             # Static assets
```

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd quantum-frontend
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
cp .env.example .env
```

4. Update environment variables in `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

5. Start the development server
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (not recommended)

## Development Roadmap

### Phase 1: Foundation (Days 1-4)
- [x] Project setup and structure
- [x] Authentication system
- [x] Basic routing and navigation
- [ ] Database schema and API integration

### Phase 2: Core Features (Days 5-12)
- [ ] Venue listing and search
- [ ] Venue detail pages with slot booking
- [ ] Payment integration (Razorpay)
- [ ] User profile and booking history

### Phase 3: Partner & Admin (Days 13-16)
- [ ] Partner onboarding and venue management
- [ ] Partner dashboard with analytics
- [ ] Admin panel for venue approval
- [ ] User and partner management

### Phase 4: E-commerce & Polish (Days 17-20)
- [ ] E-commerce functionality
- [ ] Subscription system
- [ ] UI/UX improvements
- [ ] Testing and bug fixes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is proprietary and confidential.
