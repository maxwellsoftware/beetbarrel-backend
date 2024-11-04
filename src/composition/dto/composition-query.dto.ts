import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationMetaResponseDto, PaginationRequestDto } from 'src/common/dto/pagination.dto';
import { SortOrder } from 'src/common/enums/query.enum';
import { CompotisionWithAuthorDto } from './composition.dto';

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
    description: 'Sort by field',
    enum: () => CompositionSortBy,
    enumName: 'CompositionSortBy',
    example: CompositionSortBy.NAME,
  })
  @IsOptional()
  @IsEnum(CompositionSortBy)
  sortBy?: CompositionSortBy = CompositionSortBy.NAME;

  @ApiPropertyOptional({
    description: 'Order by ',
    enum: () => SortOrder,
    enumName: 'SortOrder',
    example: SortOrder.ASC,
  })
  @IsOptional()
  @IsEnum(SortOrder)
  orderBy?: SortOrder = SortOrder.ASC;
}

export class CompositionQueryResponseDto extends PaginationMetaResponseDto {
  @ApiProperty({ type: [CompotisionWithAuthorDto] })
  data: CompotisionWithAuthorDto[];
}
