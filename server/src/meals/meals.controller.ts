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
import { Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('meals')
@UseGuards(AuthorizationGuard)
export class MealsController {
  constructor(private mealsService: MealsService) {}

  @UseGuards(RolesGuard)
  @Roles('user')
  @Post()
  async createMeal(@Req() req): Promise<any> {
    return await this.mealsService.createMeal(req.body);
  }

  @UseGuards(RolesGuard)
  @Roles('user')
  @Get()
  async getMeals(): Promise<any> {
    return await this.mealsService.getMeals();
  }

  @UseGuards(RolesGuard)
  @Roles('user')
  @Get('active')
  async getActiveMeals(): Promise<any> {
    return await this.mealsService.getActiveMeals();
  }

  @UseGuards(RolesGuard)
  @Roles('user')
  @Get('inactive')
  async getInactiveMeals(): Promise<any> {
    return await this.mealsService.getInactiveMeals();
  }

  @UseGuards(RolesGuard)
  @Roles('user')
  @Get('user/:uid')
  async getMealsByUser(@Param('uid') uid: number): Promise<any> {
    return await this.mealsService.getMealsByUser(uid);
  }

  @UseGuards(RolesGuard)
  @Roles('user')
  @Get('user/:uid/active')
  async getActiveMealsByUser(@Param('uid') uid: number): Promise<any> {
    return await this.mealsService.getActiveMealsByUser(uid);
  }

  @UseGuards(RolesGuard)
  @Roles('user')
  @Get('user/:uid/inactive')
  async getInactiveMealsByUser(@Param('uid') uid: number): Promise<any> {
    return await this.mealsService.getInactiveMealsByUser(uid);
  }

  @UseGuards(RolesGuard)
  @Roles('user')
  @Get(':id')
  async getMealById(@Param('id') id: number): Promise<any> {
    return await this.mealsService.getMealById(id);
  }

  @UseGuards(RolesGuard)
  @Roles('user')
  @Delete(':id')
  async deleteMeal(@Param('id') id: number): Promise<any> {
    return await this.mealsService.deleteMeal(id);
  }

  @UseGuards(RolesGuard)
  @Roles('user')
  @Put(':id')
  async updateMeal(@Param('id') id: number, @Req() req): Promise<any> {
    return await this.mealsService.updateMeal(id, req.body);
  }
}
