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
import { CompositionService } from './composition.service';
import { CreateCompositionDto } from './dto/create-composition.dto';
import { UpdateCompositionDto } from './dto/update-composition.dto';
import { CompositionQueryDto, CompositionQueryResponseDto } from './dto/composition-query.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { CompositionDto } from './dto/composition.dto';

@Controller('composition')
export class CompositionController {
  constructor(private readonly compositionService: CompositionService) {}

  @Post('/')
  @ApiBody({ type: CreateCompositionDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: CompositionDto })
  create(@Body() createCompositionDto: CreateCompositionDto) {
    return this.compositionService.create(createCompositionDto);
  }

  @Get('/')
  @ApiResponse({ status: HttpStatus.OK, type: CompositionQueryResponseDto })
  findAll(@Query() query: CompositionQueryDto) {
    return this.compositionService.findAll(query);
  }

  @Get('/:id')
  @ApiResponse({ status: HttpStatus.OK, type: CompositionDto })
  findOne(@Param('id') id: string) {
    return this.compositionService.findOne(id);
  }

  @Patch('/:id')
  @ApiBody({ type: UpdateCompositionDto })
  @ApiResponse({ status: HttpStatus.OK, type: CompositionDto })
  update(@Param('id') id: string, @Body() updateCompositionDto: UpdateCompositionDto) {
    return this.compositionService.update(id, updateCompositionDto);
  }

  @Delete('/:id')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  remove(@Param('id') id: string) {
    return this.compositionService.remove(id);
  }
}
