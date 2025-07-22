# Backend API

A TypeScript backend with Express.js, Prisma ORM, and PostgreSQL.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create a `.env` file:
   ```env
   DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/booking_db"
   PORT=4000
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=development
   ```

3. **Set up database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push schema to database
   npx prisma db push
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

## Project Structure

```
backend/
├── prisma/
│   └── schema.prisma       # Database schema
├── src/
│   ├── config/
│   │   └── db.ts           # Prisma client
│   ├── controllers/
│   │   └── auth.controller.ts
│   ├── models/
│   │   └── user.model.ts
│   ├── routes/
│   │   └── auth.routes.ts
│   ├── services/
│   │   └── auth.service.ts
│   ├── utils/
│   ├── app.ts              # Express app
│   └── index.ts            # Server entry
├── package.json
└── tsconfig.json
``` 