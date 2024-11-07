import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationMetaResponseDto, PaginationRequestDto } from 'src/common/dto/pagination.dto';
import { SortOrder } from 'src/common/enums/query.enum';
import { CompotisionWithAuthorDto } from './composition.dto';
import { Transform } from 'class-transformer';

enum CompositionSortBy {
  NAME = 'name',
  GENRE = 'genre',
  DURATION = 'duration',
}

export class CompositionQueryDto extends PaginationRequestDto {
  @ApiPropertyOptional({
    description: 'Composition name',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Composition genre',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  genre?: string;

  @ApiPropertyOptional({
    description: 'Composition author name',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  authorName?: string;

  @ApiPropertyOptional({
    description: 'Fields to sort by, separated by commas (e.g., name,duration)',
    enum: CompositionSortBy,
    isArray: true,
  })
  @IsOptional()
  @Transform(({ value }) => value.split(','))
  @IsEnum(CompositionSortBy, { each: true })
  sortBy?: CompositionSortBy[];

  @ApiPropertyOptional({
    description: 'Order for each sort field, separated by commas (e.g., asc,desc)',
    enum: SortOrder,
    isArray: true,
  })
  @IsOptional()
  @Transform(({ value }) => value.split(','))
  @IsEnum(SortOrder, { each: true })
  orderBy?: SortOrder[];
}

export class CompositionQueryResponseDto extends PaginationMetaResponseDto {
  @ApiProperty({ type: [CompotisionWithAuthorDto] })
  data: CompotisionWithAuthorDto[];
}
