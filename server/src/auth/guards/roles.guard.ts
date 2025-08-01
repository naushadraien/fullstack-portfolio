import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLE_KEY } from 'src/common/constants/roles';
import { ActiveUserData } from 'src/common/decorators/active-user.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as ActiveUserData;
    const hasRole = roles.some((role) => role === user.role);
    if (!user || !hasRole) {
      throw new ForbiddenException(
        'You do not have the required role to access this resource',
      );
    }
    return hasRole;
  }
}
