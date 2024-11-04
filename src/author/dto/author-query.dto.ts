import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationMetaResponseDto, PaginationRequestDto } from 'src/common/dto/pagination.dto';
import { SortOrder } from 'src/common/enums/query.enum';
import { AuthorWithCompositionsDto } from './author.dto';

export class AuthorQueryDto extends PaginationRequestDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(SortOrder)
  orderBy?: SortOrder = SortOrder.ASC;
}

export class AuthorQeuryResponseDto extends PaginationMetaResponseDto {
  @ApiProperty({ type: [AuthorWithCompositionsDto] })
  data: AuthorWithCompositionsDto[];
}
