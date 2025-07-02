import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EXCLUDE_FIELDS_KEY } from 'src/common/decorators/exclude-fields.decorator';

@Injectable()
export class ExcludeFieldsInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const excludeFields = this.reflector.getAllAndOverride<string[]>(
      EXCLUDE_FIELDS_KEY,
      [context.getHandler(), context.getClass()],
    ) || ['password', 'hashedRefreshToken'];

    return next.handle().pipe(
      map((data) => {
        return this.excludeFields(data, excludeFields);
      }),
    );
  }

  private excludeFields(data: any, fields: string[]): any {
    if (!data) return data;

    if (data && typeof data === 'object' && !Array.isArray(data)) {
      const result = { ...data };
      fields.forEach((field) => delete result[field]);
      return result;
    }

    if (Array.isArray(data)) {
      return data.map((item) => {
        if (item && typeof item === 'object') {
          const result = { ...item };
          fields.forEach((field) => delete result[field]);
          return result;
        }
        return item;
      });
    }

    return data;
  }
}
