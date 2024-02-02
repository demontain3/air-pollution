import { UsePipes, ValidationPipe } from '@nestjs/common';

@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export abstract class BaseController {}