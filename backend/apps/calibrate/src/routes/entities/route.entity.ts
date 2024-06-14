import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Position } from '../../positions/entities/position.entity';
import { AbstractDocument } from 'apps/calibrate/database/abstract.schema';

@Schema()
export class Route extends AbstractDocument {
  @Prop({ type: String })
  start: string;

  @Prop({ type: String })
  finish: string;

  @Prop({ type: Boolean, default: false })
  complete: boolean;

  @Prop({ type: Number })
  owner: number; // this is user ID

  @Prop([{ type: Types.ObjectId, ref: 'Position' }])
  positions: Position[];
}

export const RouteSchema = SchemaFactory.createForClass(Route);