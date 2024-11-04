import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Author } from '@prisma/client';
import { AuthorQueryDto } from './dto/author-query.dto';
import { AuthorFilters } from './types/author-filters.interface';

@Injectable()
export class AuthorService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    return await this.prismaService.author.create({
      data: createAuthorDto,
    });
  }

  async findAll({ name, orderBy, limit, page }: AuthorQueryDto) {
    const filters: AuthorFilters = {};

    if (name) filters.name = { contains: name, mode: 'insensitive' };

    const skip = (page - 1) * limit;
    const take = limit;

    const authors = await this.prismaService.author.findMany({
      where: filters,
      skip,
      take,
      orderBy: {
        name: orderBy,
      },
    });

    const total = await this.prismaService.composition.count({ where: filters });
    const totalPages = Math.ceil(total / limit);

    return {
      data: authors,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  async findOne(id: string): Promise<Author> {
    const author = await this.prismaService.author.findUnique({
      where: { id },
    });

    if (!author) {
      throw new NotFoundException();
    }

    return author;
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const author = await this.prismaService.author.update({
      where: { id },
      data: updateAuthorDto,
    });

    if (!author) {
      throw new NotFoundException();
    }

    return author;
  }

  async remove(id: string) {
    try {
      const deleteCompositions = this.prismaService.composition.deleteMany({
        where: {
          authorId: id,
        },
      });

      const deleteAuthor = this.prismaService.author.delete({
        where: {
          id,
        },
      });

      await this.prismaService.$transaction([deleteCompositions, deleteAuthor]);

      throw new HttpException(null, HttpStatus.NO_CONTENT);
    } catch (error) {
      console.error(error);
      throw new NotFoundException();
    }
  }
}
