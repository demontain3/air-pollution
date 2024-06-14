import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Route } from '../../routes/entities/route.entity';
import { SensorData } from '../../sensor_datas/entities/sensor_data.entity';
import { AbstractDocument } from 'apps/calibrate/database/abstract.schema';

@Schema()
export class Position extends AbstractDocument {
  @Prop({ type: Number })
  lati: number;

  @Prop({ type: Number })
  lngi: number;

  @Prop({ type: Number })
  alti: number;

  @Prop({ type: String })
  timestamp: string;

  @Prop({ type: Types.ObjectId, ref: 'Route' })
  route: Route;

  @Prop({ type: Types.ObjectId, ref: 'SensorData' })
  sensorData: SensorData;
}

export const PositionSchema = SchemaFactory.createForClass(Position);