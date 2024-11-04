import { OmitType } from '@nestjs/swagger';
import { CompositionDto } from './composition.dto';

export class CreateCompositionDto extends OmitType(CompositionDto, ['id'] as const) {}
