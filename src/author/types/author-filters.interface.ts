import { Prisma } from '@prisma/client';

export interface AuthorFilters {
  name?: Prisma.StringFilter;
}
