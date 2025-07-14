import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Database connection
(async () => {
  try {
    await prisma.$connect();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
})();

// CORS middleware
app.use((req, res, next) => {
  console.log('===== CORS Middleware Debug =====');
  console.log('Full Request Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Request Method:', req.method);
  console.log('Origin:', req.headers.origin);
  console.log('Referer:', req.headers.referer);
  console.log('Host:', req.headers.host);

  const allowedOrigins = ['http://localhost:3000', 'http://localhost:4000'];
  const origin = req.headers.origin;
  const referer = req.headers.referer;
  
  // More comprehensive origin checking
  const isAllowedOrigin = allowedOrigins.some(allowedOrigin => 
    (origin && origin.startsWith(allowedOrigin)) || 
    (referer && referer.startsWith(allowedOrigin))
  );

  console.log('Is Allowed Origin:', isAllowedOrigin);

  // Set CORS headers more explicitly
  res.header('Vary', 'Origin');
  
  if (isAllowedOrigin) {
    res.header('Access-Control-Allow-Origin', origin || referer || allowedOrigins[0]);
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-client-key, x-client-token, x-client-secret, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // More permissive Referrer Policy
  res.header('Referrer-Policy', 'origin-when-cross-origin');
  
  // Additional security headers
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'SAMEORIGIN');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling Preflight Request');
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (_req, res) => {
  res.send('Backend is running');
});

export default app; 