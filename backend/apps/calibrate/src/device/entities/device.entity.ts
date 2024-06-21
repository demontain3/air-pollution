import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { AbstractDocument } from 'apps/calibrate/database/abstract.schema';
import { DeviceType } from '../dto/enum/device-type.enum';

@Schema()
export class DeviceDocument extends AbstractDocument {
  @Prop({ type: String, required: true })
  serialNo: string;

  @Prop({ type: String, enum: DeviceType, required: true, default: DeviceType.STATIONERY})
  type: DeviceType;

  @Prop({type: Number, required: false})
  owner: number;

  @Prop({ type: Number })
  calibrateValue: number;
}

export const DeviceSchema = SchemaFactory.createForClass(DeviceDocument);