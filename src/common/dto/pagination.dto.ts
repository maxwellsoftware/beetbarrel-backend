import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationMetaResponseDto {
  @ApiProperty({ type: 'number', default: 1 })
  total: number;

  @ApiProperty({ type: 'number', default: 1 })
  page: number;

  @ApiProperty({ type: 'number', default: 10 })
  limit: number;

  @ApiProperty({ type: 'number', default: 1 })
  totalPages: number;
}

export class PaginationRequestDto {
  @ApiPropertyOptional({
    description: 'Pagination limit',
    type: 'number',
    minimum: 1,
    default: 10,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => Number(value))
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Pagination page',
    type: 'number',
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => Number(value))
  page?: number = 1;
}
