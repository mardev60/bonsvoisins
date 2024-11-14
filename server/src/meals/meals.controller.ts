import { Controller, Get, UseGuards } from '@nestjs/common';
import { MealsService } from './meals.service';
import { AuthorizationGuard } from 'src/guards/authorization.guard';

@Controller('meals')
@UseGuards(AuthorizationGuard)
export class MealsController {
  constructor(private mealsService: MealsService) {}

  @Get()
  async getMeals(): Promise<any> {
    return await this.mealsService.getMeals();
  }
}
