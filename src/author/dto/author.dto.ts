import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Author, Composition } from '@prisma/client';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { CompositionDto } from 'src/composition/dto/composition.dto';

export class AuthorDto implements Author {
  @ApiProperty({ type: 'string' })
  @IsString()
  id: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsString()
  @IsOptional()
  website: string;

  @ApiProperty({ type: 'string' })
  @IsDate()
  createdAt: Date;
}

export class AuthorWithCompositionsDto extends AuthorDto {
  @ApiProperty({ type: [CompositionDto] })
  compositions: Composition[];
}
