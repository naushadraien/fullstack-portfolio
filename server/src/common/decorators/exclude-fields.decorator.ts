import { SetMetadata } from '@nestjs/common';

export const EXCLUDE_FIELDS_KEY = 'excludeFields';

export const ExcludeFields = (...fields: string[]) =>
  SetMetadata(EXCLUDE_FIELDS_KEY, fields);
