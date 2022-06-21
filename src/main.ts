import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session');
import { ConfigModule } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';
import { join } from 'path';

// This way we can set env vars with out call the ConfigService;
ConfigModule.forRoot();
//console.log(process.env.COOKIE_KEY)

async function bootstrap() {

  const app: NestExpressApplication = await NestFactory.create(AppModule);

  // Serving files in a static folder
  app.useStaticAssets(join(__dirname, '..', 'assets'))

  app.use(cookieSession({
    keys: [process.env.COOKIE_KEY]
  }))
  
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Swagger configs...
  const config = new DocumentBuilder()
    .setTitle('Car Selling')
    .setDescription('Test API built with NestJs. The general idea is publish car ads.')
    .setVersion('1.0')
    .addTag('Cars')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Car Selling Docs',
    customfavIcon: '../favicon.ico'
  };
  SwaggerModule.setup('api', app, document, customOptions);

  await app.listen(3000);
}
bootstrap();
