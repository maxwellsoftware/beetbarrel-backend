import { ApiProperty } from '@nestjs/swagger';
import { Author, Composition } from '@prisma/client';
import { IsNumber, IsString, Max, Min } from 'class-validator';
import { AuthorDto } from 'src/author/dto/author.dto';

export class CompositionDto implements Composition {
  @ApiProperty({ type: 'string' })
  @IsString()
  id: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  name: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  authorId: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  genre: string;

  @ApiProperty({ type: 'number', minimum: 1, maximum: 3600 })
  @IsNumber()
  @Min(1)
  @Max(3600)
  duration: number;
}

export class CompotisionWithAuthorDto extends CompositionDto {
  @ApiProperty({ type: AuthorDto })
  author: Author;
}
