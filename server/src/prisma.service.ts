import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('✅ Database connected successfully');

      // Optional: Test the connection with a simple query
      await this.$queryRaw`SELECT 1`;
      this.logger.log('✅ Database connection tested successfully');
    } catch (error) {
      this.logger.error('❌ Failed to connect to database:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.log('🔌 Database disconnected successfully');
    } catch (error) {
      this.logger.error('❌ Error disconnecting from database:', error);
    }
  }

  extendedPrismaClient() {
    return this.$extends(withAccelerate());
  }

  // Health check method
  async healthCheck(): Promise<{ status: string; message: string }> {
    try {
      await this.$queryRaw`SELECT 1`;
      return {
        status: 'healthy',
        message: 'Database connection is working',
      };
    } catch (error) {
      this.logger.error('Database health check failed:', error);
      return {
        status: 'unhealthy',
        message: 'Database connection failed',
      };
    }
  }
}
