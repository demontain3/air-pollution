import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'apps/calibrate/database/abstract.schema';
import { PositionDocument } from '../../positions/entities/position.entity';
import { Types } from 'mongoose';
import { DeviceDocument } from '../../device/entities/device.entity';

@Schema({ versionKey: false })
export class SensorDataDocument extends AbstractDocument {
  @Prop({ type: String })
  kei: string;

  @Prop({ type: Number })
  value: number;

  @Prop({ type: Date })
  timestamp: Date;

  @Prop({ type: Types.ObjectId, ref: 'Device' })
  device: DeviceDocument;

  @Prop({ type: Types.ObjectId, ref: 'Position' })
  position: PositionDocument;
}

export const SensorDataSchema =
  SchemaFactory.createForClass(SensorDataDocument);