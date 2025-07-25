import app from "./app";
import { connectDatabase } from "./config/db";
import { Request, Response } from 'express';

// Create handler for serverless function
const handler = async (req: Request, res: Response) => {
  try {
    // Ensure database connection
    await connectDatabase();
    
    // Return the Express app as middleware
    return app(req, res);

  } catch (error: unknown) {
    console.error('Serverless function error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export default handler;