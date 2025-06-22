import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingProvider {
  abstract hashPassword(data: string): Promise<string>;
  abstract hashRefreshToken(data: string): Promise<string>;
  abstract comparePassword(
    data: string,
    encryptedPassword: string,
  ): Promise<boolean>;
  abstract compareRefreshToken(
    data: string,
    encryptedRefreshToken: string,
  ): Promise<boolean>;
}
