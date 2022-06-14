import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session');
import { ConfigModule } from '@nestjs/config';

// This way we can set env vars with out call the ConfigService;
ConfigModule.forRoot();
//console.log(process.env.COOKIE_KEY)

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: [process.env.COOKIE_KEY]
  }))
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
}
bootstrap();
