import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorQeuryResponseDto, AuthorQueryDto } from './dto/author-query.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthorDto } from './dto/author.dto';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @ApiBody({ type: CreateAuthorDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: AuthorDto })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: AuthorQeuryResponseDto })
  findAll(@Query() query: AuthorQueryDto) {
    return this.authorService.findAll(query);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: AuthorDto })
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, type: AuthorDto })
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  remove(@Param('id') id: string) {
    return this.authorService.remove(id);
  }
}
