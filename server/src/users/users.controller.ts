import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthorizationGuard } from 'src/guards/authorization.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService : UsersService) {}

  @UseGuards(AuthorizationGuard)
  @Post('check-first-time')
  async checkFirstTime(@Req() req): Promise<boolean> {
    return await this.usersService.checkFirstTime(req.user);
  }

  @UseGuards(AuthorizationGuard)
  @Post('update-user-infos')
  async updateUserInfos(@Req() req): Promise<any> {
    return await this.usersService.updateUserInfos(req.user, req.body);
  }
}