import { Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

// @Module({
//   imports: [
//     // MongooseModule.forRootAsync({
//     //   useFactory: (configService: ConfigService) => ({
//     //     uri: configService.get('MONGODB_URI'),
//     //     dbName: configService.get('MONGO_DB'),
//     //     connectionFactory: (connection) => {
//     //       return connection;
//     //     },
//     //   }),
//     //   inject: [ConfigService],
//     // }), 
//   ],
// })

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://amrit191503:IPkFf0czZMVICBta@cluster0.hvqjz5n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      connectionFactory: (connection) => {
        console.log('Mongoose connection established', connection.readyState);
        connection.on('error', (err:any) => {
          console.error('Mongoose connection error:', err);
        });
        connection.on('disconnected', () => {
          console.warn('Mongoose connection disconnected');
        });
        return connection;
      },
    }),
  ],
})
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}

``