import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeController } from '@nestjs/swagger';
// import { ApiExcludeEndpoint } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //@ApiExcludeEndpoint(true) // We could exclude, also, an unique endpoint...
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
