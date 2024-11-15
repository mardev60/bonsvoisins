import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { MealsService } from './meals.service';
import { AuthorizationGuard } from 'src/guards/authorization.guard';

@Controller('meals')
@UseGuards(AuthorizationGuard)
export class MealsController {
  constructor(private mealsService: MealsService) {}

  @Get()
  async getActiveMeals(): Promise<any> {
    return await this.mealsService.getActiveMeals();
  }

  @Get('my-meals')
  async getMyMeals(@Req() req): Promise<any> {
    return await this.mealsService.getAllMyMeals(req.user);
  }
}
