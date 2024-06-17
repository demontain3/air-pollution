import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { RouteDocument } from '../../routes/entities/route.entity';
import { SensorDataDocument } from '../../sensor_datas/entities/sensor_data.entity';
import { AbstractDocument } from 'apps/calibrate/database/abstract.schema';

@Schema()
export class PositionDocument extends AbstractDocument {
  @Prop({ type: Number })
  lati: number;

  @Prop({ type: Number })
  lngi: number;

  @Prop({ type: Number })
  alti: number;

  @Prop({ type: Date })
  timestamp: Date;

  @Prop({ type: Types.ObjectId, ref: 'Route' })
  route: RouteDocument;

  @Prop({ type: Types.ObjectId, ref: 'SensorData' })
  sensorDataDocument: SensorDataDocument;
}

export const PositionSchema = SchemaFactory.createForClass(PositionDocument);