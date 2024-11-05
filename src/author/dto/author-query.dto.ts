import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationMetaResponseDto, PaginationRequestDto } from 'src/common/dto/pagination.dto';
import { SortOrder } from 'src/common/enums/query.enum';
import { AuthorWithCompositionsDto } from './author.dto';

export class AuthorQueryDto extends PaginationRequestDto {
  @ApiPropertyOptional({
    description: 'Author name',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  name?: string;

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

export class AuthorQueryResponseDto extends PaginationMetaResponseDto {
  @ApiProperty({ type: [AuthorWithCompositionsDto] })
  data: AuthorWithCompositionsDto[];
}
