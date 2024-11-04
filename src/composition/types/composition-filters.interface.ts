import { Prisma } from '@prisma/client';

export interface CompositionFilters {
  name?: Prisma.StringFilter;
  genre?: Prisma.StringFilter;
  author?: {
    name?: Prisma.StringFilter;
  };
}
