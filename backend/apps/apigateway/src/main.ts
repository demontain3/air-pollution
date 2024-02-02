import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json());
  const config = new DocumentBuilder()
    .setTitle('Node API')
    .setDescription(
      `<a
       target="_blank"
       href="https://gitlab.com/hepa_pure/vayu"
     >https://gitlab.com/hepa_pure/vayu</a>`,
    )
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
