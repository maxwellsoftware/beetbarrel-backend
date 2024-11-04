import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompositionDto } from './dto/create-composition.dto';
import { UpdateCompositionDto } from './dto/update-composition.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompositionQueryDto } from './dto/composition-query.dto';
import { CompositionFilters } from './types/composition-filters.interface';

@Injectable()
export class CompositionService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCompositionDto: CreateCompositionDto) {
    return await this.prismaService.composition.create({ data: createCompositionDto });
  }

  async findAll(query: CompositionQueryDto) {
    const { name, authorName, genre, sortBy, orderBy, page, limit } = query;

    const filters: CompositionFilters = {};

    if (name) filters.name = { contains: name, mode: 'insensitive' };
    if (genre) filters.genre = { contains: genre, mode: 'insensitive' };
    if (authorName) {
      filters.author = { name: { contains: authorName, mode: 'insensitive' } };
    }

    const skip = (page - 1) * limit;
    const take = limit;

    const compositions = await this.prismaService.composition.findMany({
      where: filters,
      orderBy: sortBy ? { [sortBy]: orderBy } : undefined,
      skip,
      take,
      include: {
        author: true,
      },
    });

    const total = await this.prismaService.composition.count({ where: filters });
    const totalPages = Math.ceil(total / limit);

    return {
      data: compositions,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  async findOne(id: string) {
    const composition = await this.prismaService.composition.findUnique({ where: { id } });

    if (!composition) {
      throw new NotFoundException();
    }
  }

  async update(id: string, updateCompositionDto: UpdateCompositionDto) {
    try {
      const composition = await this.prismaService.composition.update({
        where: { id },
        data: updateCompositionDto,
      });

      return composition;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async remove(id: string) {
    try {
      await this.prismaService.composition.delete({
        where: { id },
      });

      throw new HttpException(null, HttpStatus.NO_CONTENT);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
