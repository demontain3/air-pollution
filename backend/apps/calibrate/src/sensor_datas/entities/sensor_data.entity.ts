import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'apps/calibrate/database/abstract.schema';
import { PositionDocument } from '../../positions/entities/position.entity';
import { Types } from 'mongoose';

@Schema({ versionKey: false })
export class SensorDataDocument extends AbstractDocument {
  @Prop({ type: String })
  kei: string;

  @Prop({ type: String })
  timestamp: string;

  @Prop({ type: Number })
  device_owner: number; //this is user id

  @Prop({ type: Types.ObjectId, ref: 'Position' })
  position: PositionDocument;
}

export const SensorDataSchema =
  SchemaFactory.createForClass(SensorDataDocument);