import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();
console.log(process.env.COOKIE_KEY)

export const setupApp = (app: any) => {
    app.use(cookieSession({
        keys: [process.env.COOKIE_KEY]
      }))
      
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
};