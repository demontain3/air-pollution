import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
        useFactory: (configService: ConfigService) => ({
          uri: configService.get('MONGODB_URI'),
          dbName: configService.get('MONGO_DB'),
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }),
        inject: [ConfigService],
      }),

  ],
  
})
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}