import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

export interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  maxAge?: number;
  path?: string;
  domain?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class CookieProvider {
  private readonly isProduction: boolean;
  private readonly cookieDomain: string;

  constructor(private readonly configService: ConfigService) {
    this.isProduction = this.configService.get('NODE_ENV') === 'production';
    this.cookieDomain = this.configService.get('COOKIE_DOMAIN');
  }

  /**
   * Set both access and refresh token cookies
   */
  setAuthCookies(res: Response, tokens: AuthTokens): void {
    this.setAccessTokenCookie(res, tokens.accessToken);
    this.setRefreshTokenCookie(res, tokens.refreshToken);
  }

  /**
   * Set access token cookie (short-lived)
   */
  setAccessTokenCookie(res: Response, accessToken: string): void {
    const options = this.getAccessTokenCookieOptions();
    res.cookie('accessToken', accessToken, options);
  }

  /**
   * Set refresh token cookie (long-lived)
   */
  setRefreshTokenCookie(res: Response, refreshToken: string): void {
    const options = this.getRefreshTokenCookieOptions();
    res.cookie('refreshToken', refreshToken, options);
  }

  /**
   * Clear both authentication cookies
   */
  clearAuthCookies(res: Response): void {
    this.clearAccessTokenCookie(res);
    this.clearRefreshTokenCookie(res);
  }

  /**
   * Clear access token cookie
   */
  clearAccessTokenCookie(res: Response): void {
    const options = this.getBaseCookieOptions();
    res.clearCookie('accessToken', options);
  }

  /**
   * Clear refresh token cookie
   */
  clearRefreshTokenCookie(res: Response): void {
    const options = this.getBaseCookieOptions();
    res.clearCookie('refreshToken', options);
  }

  /**
   * Set a custom cookie with specified options
   */
  setCookie(
    res: Response,
    name: string,
    value: string,
    options?: Partial<CookieOptions>,
  ): void {
    const cookieOptions = {
      ...this.getBaseCookieOptions(),
      ...options,
    };
    res.cookie(name, value, cookieOptions);
  }

  /**
   * Clear a custom cookie
   */
  clearCookie(
    res: Response,
    name: string,
    options?: Partial<CookieOptions>,
  ): void {
    const cookieOptions = {
      ...this.getBaseCookieOptions(),
      ...options,
    };
    res.clearCookie(name, cookieOptions);
  }

  /**
   * Get access token cookie configuration
   */
  private getAccessTokenCookieOptions(): CookieOptions {
    return {
      ...this.getBaseCookieOptions(),
      maxAge: this.getAccessTokenMaxAge(), // 15 minutes
    };
  }

  /**
   * Get refresh token cookie configuration
   */
  private getRefreshTokenCookieOptions(): CookieOptions {
    return {
      ...this.getBaseCookieOptions(),
      maxAge: this.getRefreshTokenMaxAge(), // 7 days
    };
  }

  /**
   * Get base cookie configuration shared by all cookies
   */
  private getBaseCookieOptions(): CookieOptions {
    return {
      httpOnly: true, // Prevents XSS attacks
      secure: this.isProduction, // HTTPS only in production
      sameSite: 'strict', // CSRF protection
      path: '/', // Available on all routes
      ...(this.cookieDomain && { domain: this.cookieDomain }),
    };
  }

  private getAccessTokenMaxAge(): number {
    const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN', '1h');
    return this.parseTimeToMilliseconds(expiresIn);
  }

  /**
   * Get refresh token max age in milliseconds (7 days)
   */
  private getRefreshTokenMaxAge(): number {
    const expiresIn = this.configService.get<string>(
      'REFRESH_JWT_EXPIRES_IN',
      '7d',
    );
    return this.parseTimeToMilliseconds(expiresIn);
  }

  /**
   * Check if cookies should be secure (HTTPS only)
   */
  isSecure(): boolean {
    return this.isProduction;
  }

  /**
   * Get cookie domain
   */
  getDomain(): string | undefined {
    return this.cookieDomain;
  }

  /**
   * Set session cookie (expires when browser closes)
   */
  setSessionCookie(res: Response, name: string, value: string): void {
    const options = {
      ...this.getBaseCookieOptions(),
      maxAge: undefined, // Session cookie
    };
    res.cookie(name, value, options);
  }

  /**
   * Set remember me cookie (long-lived)
   */
  setRememberMeCookie(res: Response, value: string): void {
    const options = {
      ...this.getBaseCookieOptions(),
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    };
    res.cookie('rememberMe', value, options);
  }

  /**
   * Clear remember me cookie
   */
  clearRememberMeCookie(res: Response): void {
    this.clearCookie(res, 'rememberMe');
  }

  /**
   * Parse time string to milliseconds
   * Supports: 1h, 15m, 7d, 30s, etc.
   */
  private parseTimeToMilliseconds(timeString: string): number {
    const timeValue = timeString.slice(0, -1); // Remove last character (unit)
    const timeUnit = timeString.slice(-1); // Get last character (unit)
    const value = parseInt(timeValue, 10);

    if (isNaN(value)) {
      throw new Error(`Invalid time value: ${timeString}`);
    }

    switch (timeUnit.toLowerCase()) {
      case 's': // seconds
        return value * 1000;
      case 'm': // minutes
        return value * 60 * 1000;
      case 'h': // hours
        return value * 60 * 60 * 1000;
      case 'd': // days
        return value * 24 * 60 * 60 * 1000;
      case 'w': // weeks
        return value * 7 * 24 * 60 * 60 * 1000;
      default:
        throw new Error(`Unsupported time unit: ${timeUnit}`);
    }
  }
}
