import app from './app';
import { connectDatabase, disconnectDatabase, checkDatabaseHealth } from './config/db';

const PORT = process.env['PORT'] || 4000;

// Start server with database connection
const startServer = async () => {
  try {
    // Connect to database
    await connectDatabase();
    
    // Check database health
    const isHealthy = await checkDatabaseHealth();
    if (!isHealthy) {
      throw new Error('Database health check failed');
    }

    // Start the server
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env['NODE_ENV'] || 'development'}`);
      console.log(`🔗 Database: PostgreSQL with Prisma`);
    });

    // Graceful shutdown
    const gracefulShutdown = async () => {
      console.log('👋 Shutting down gracefully...');
      server.close(async () => {
        await disconnectDatabase();
        console.log('💥 Process terminated!');
        process.exit(0);
      });
    };

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err: Error) => {
      console.log(`❌ Unhandled Promise Rejection: ${err.message}`);
      gracefulShutdown();
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (err: Error) => {
      console.log(`❌ Uncaught Exception: ${err.message}`);
      gracefulShutdown();
    });

    // Handle SIGTERM
    process.on('SIGTERM', gracefulShutdown);
    
    // Handle SIGINT
    process.on('SIGINT', gracefulShutdown);

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 