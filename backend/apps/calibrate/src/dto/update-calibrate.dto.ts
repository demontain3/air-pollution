import { PartialType } from '@nestjs/swagger';
import { CreateCalibrateDto } from './create-calibrate.dto';

export class UpdateCalibrateDto extends PartialType(CreateCalibrateDto) {}
