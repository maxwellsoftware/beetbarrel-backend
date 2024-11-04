import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthorModule } from './author/author.module';
import { CompositionModule } from './composition/composition.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [PrismaModule, AuthorModule, CompositionModule],
  providers: [PrismaService],
})
export class AppModule {}
