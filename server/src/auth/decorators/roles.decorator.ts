import { BadRequestException, SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';
import { ROLE_KEY } from 'src/common/constants/roles';

export const Roles = (...roles: Role[]) => {
  if (roles.length === 0) {
    throw new BadRequestException('Roles cannot be empty');
  }
  return SetMetadata(ROLE_KEY, roles);
};
