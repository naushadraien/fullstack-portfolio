import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as argon2 from 'argon2';

@Injectable()
export class Argon2Provider extends HashingProvider {
  async hashPassword(data: string): Promise<string> {
    return argon2.hash(data);
  }
  async hashRefreshToken(data: string): Promise<string> {
    return argon2.hash(data);
  }

  async comparePassword(
    data: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    return argon2.verify(encryptedPassword, data);
  }

  async compareRefreshToken(
    data: string,
    encryptedRefreshToken: string,
  ): Promise<boolean> {
    return argon2.verify(encryptedRefreshToken, data);
  }
}
