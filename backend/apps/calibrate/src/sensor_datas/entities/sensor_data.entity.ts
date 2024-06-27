import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'apps/calibrate/database/abstract.schema';
import { PositionDocument } from '../../positions/entities/position.entity';
import { Types } from 'mongoose';
import { DeviceDocument } from '../../device/entities/device.entity';
import { KeiType } from '../dto/enums/kei.enum';

@Schema({ versionKey: false })
export class SensorDataDocument extends AbstractDocument {
  @Prop({ type: String, enum: Object.values(KeiType) })
  kei: KeiType;

  @Prop({ type: Number })
  value: number;

  @Prop({ type: Date })
  timestamp: Date;

  @Prop({ type: Types.ObjectId, ref: 'Device' , required:false})
  device: DeviceDocument;

  @Prop({type: Number, required: false})
  userId: number;

  @Prop({ type: Types.ObjectId, ref: 'Position' })
  position: PositionDocument;
}

export const SensorDataSchema =
  SchemaFactory.createForClass(SensorDataDocument);