import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MealsService } from './meals.service';
import { AuthorizationGuard } from 'src/guards/authorization.guard';

@Controller('meals')
@UseGuards(AuthorizationGuard)
export class MealsController {
  constructor(private mealsService: MealsService) {}

  @Post()
  async createMeal(@Req() req): Promise<any> {
    return await this.mealsService.createMeal(req.body);
  }

  @Get()
  async getMeals(): Promise<any> {
    return await this.mealsService.getMeals();
  }

  @Get('active')
  async getActiveMeals(): Promise<any> {
    return await this.mealsService.getActiveMeals();
  }

  @Get('inactive')
  async getInactiveMeals(): Promise<any> {
    return await this.mealsService.getInactiveMeals();
  }

  @Get('user/:uid')
  async getMealsByUser(@Param('uid') uid: number): Promise<any> {
    return await this.mealsService.getMealsByUser(uid);
  }

  @Get('user/:uid/active')
  async getActiveMealsByUser(@Param('uid') uid: number): Promise<any> {
    return await this.mealsService.getActiveMealsByUser(uid);
  }

  @Get('user/:uid/inactive')
  async getInactiveMealsByUser(@Param('uid') uid: number): Promise<any> {
    return await this.mealsService.getInactiveMealsByUser(uid);
  }

  @Get(':id')
  async getMealById(@Param('id') id: number): Promise<any> {
    return await this.mealsService.getMealById(id);
  }

  @Delete(':id')
  async deleteMeal(@Param('id') id: number): Promise<any> {
    return await this.mealsService.deleteMeal(id);
  }

  @Put(':id')
  async updateMeal(@Param('id') id: number, @Req() req): Promise<any> {
    return await this.mealsService.updateMeal(id, req.body);
  }
}
