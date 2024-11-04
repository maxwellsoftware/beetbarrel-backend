import { OmitType } from '@nestjs/swagger';
import { AuthorDto } from './author.dto';

export class CreateAuthorDto extends OmitType(AuthorDto, ['id', 'createdAt'] as const) {}
