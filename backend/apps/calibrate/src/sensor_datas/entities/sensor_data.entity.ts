import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Position } from '../../positions/entities/position.entity';
import { AbstractDocument } from 'apps/calibrate/database/abstract.schema';

@Schema()
export class SensorData extends AbstractDocument {
  @Prop({ type: String })
  kei: string;

  @Prop({ type: String })
  timestamp: string;

  @Prop({ type: Number })
  device_owner: number; //this is user id

  @Prop({ type: Types.ObjectId, ref: 'Position' })
  position: Position;
}

export const SensorDataSchema = SchemaFactory.createForClass(SensorData);