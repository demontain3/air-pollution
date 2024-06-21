import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { RouteDocument } from '../../routes/entities/route.entity';
import { SensorDataDocument } from '../../sensor_datas/entities/sensor_data.entity';
import { AbstractDocument } from 'apps/calibrate/database/abstract.schema';

@Schema()
export class PositionDocument extends AbstractDocument {
  @Prop({ type: Number, required: true })
  lati: number;

  @Prop({ type: Number, required: true })
  lngi: number;

  @Prop({ type: Number , required: false})
  alti: number;

  @Prop({ type: Types.ObjectId, ref: 'Route', required: false })
  route?: RouteDocument;

}

export const PositionSchema = SchemaFactory.createForClass(PositionDocument);
