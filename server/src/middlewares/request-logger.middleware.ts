import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ClsService } from 'nestjs-cls';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly cls: ClsService,
    @InjectPinoLogger(RequestLoggerMiddleware.name)
    private readonly logger: PinoLogger,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Use existing request ID from header or generate a new one
    const requestId = (req.headers['x-request-id'] as string) || uuidv4();

    req.headers['x-request-id'] = requestId;
    res.setHeader('X-Request-ID', requestId);
    this.cls.set('requestId', requestId);

    const { ip, method, originalUrl } = req;
    const userAgent = this.truncate(req.get('user-agent') || '-');
    const startTime = Date.now();

    this.logger.info({
      msg: '➡️ Incoming request',
      method: req.method,
      url: req.originalUrl,
      requestId: requestId,
      userAgent,
      ip,
      userId: (req.user as any)?.id,
    });

    if (['POST', 'PUT', 'PATCH'].includes(method) && req.body) {
      const sanitizedBody = this.sanitizeBody(req.body);
      this.logger.info(
        `📦 [${requestId}] Body: ${JSON.stringify(sanitizedBody)}`,
      );
    }

    res.on('finish', () => {
      const duration = Date.now() - startTime;
      const { statusCode } = res;
      const size = res.get('content-length') || '0';
      const logFn = this.getLogFunctionForStatus(statusCode);
      const statusEmoji = this.getStatusEmoji(statusCode);

      logFn.call(
        this.logger,
        `${statusEmoji} ${method} ${this.formatUrl(originalUrl)} [${requestId}] - ${statusCode} - ${size} bytes - ${duration}ms`,
      );

      if (duration > 1000 && process.env.NODE_ENV !== 'production') {
        this.logger.warn(
          `⚠️ Slow request! [${requestId}] ${duration}ms - ${method} ${originalUrl}`,
        );
      }
    });

    next();
  }

  /**
   * Formats URL for cleaner logging (trims API prefix)
   */
  private formatUrl(url: string): string {
    return url.replace('/api/v1', '');
  }

  /**
   * Truncates long strings for cleaner logs
   */
  private truncate(str: string, length = 30): string {
    return str.length > length ? `${str.substring(0, length)}...` : str;
  }

  /**
   * Determines which logger function to use based on status code
   */
  private getLogFunctionForStatus(status: number) {
    if (status >= 500) return this.logger.error;
    if (status >= 400) return this.logger.warn;
    return this.logger.info;
  }

  /**
   * Returns an appropriate emoji for the HTTP status
   */
  private getStatusEmoji(status: number): string {
    if (status >= 500) return '❌'; // Server error
    if (status >= 400) return '⚠️'; // Client error
    if (status >= 300) return '↪️'; // Redirect
    if (status >= 200) return '✅'; // Success
    return '❓'; // Other
  }

  /**
   * Sanitizes request body to hide sensitive information
   */
  private sanitizeBody(body: any): any {
    if (!body) return {};

    // Create a shallow copy to avoid mutating the original
    const sanitized = { ...body };

    // List of fields to redact
    const sensitiveFields = [
      'password',
      'confirmPassword',
      'currentPassword',
      'newPassword',
      'token',
      'refreshToken',
      'apiKey',
      'secret',
      'authorization',
    ];

    // Redact sensitive information
    for (const field of sensitiveFields) {
      if (sanitized[field]) {
        sanitized[field] = '[REDACTED]';
      }
    }

    return sanitized;
  }
}
