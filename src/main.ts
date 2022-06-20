import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session');
import { ConfigModule } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// This way we can set env vars with out call the ConfigService;
ConfigModule.forRoot();
//console.log(process.env.COOKIE_KEY)

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.use(cookieSession({
    keys: [process.env.COOKIE_KEY]
  }))
  
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Car Selling')
    .setDescription('Test API built with NestJs. The general idea is publish car ads.')
    .setVersion('1.0')
    .addTag('Cars')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
