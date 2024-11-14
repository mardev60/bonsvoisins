import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthorizationGuard } from './guards/authorization.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthorizationGuard)
  @Get()
  getHello(@Req() req: {user : any}): string {
    return this.appService.getHello();
  }
}
