import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
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

@ApiTags('Repas')
@ApiBearerAuth()
@Controller('meals')
@UseGuards(AuthorizationGuard)
export class MealsController {
  constructor(private mealsService: MealsService) {}

  @UseGuards(RolesGuard)
  @Roles('user')
  @Post()
  @ApiOperation({ summary: 'Créer un nouveau repas' })
  @ApiResponse({ status: 201, description: 'Le repas a été créé avec succès' })
  @ApiResponse({ status: 403, description: 'Accès interdit' })
  async createMeal(@Req() req): Promise<any> {
    return await this.mealsService.createMeal(req.body, req.user.id);
  }

  @UseGuards(RolesGuard)
  @Roles('user')
  @Get()
  @ApiOperation({ summary: 'Récupérer tous les repas' })
  @ApiResponse({ status: 200, description: 'Renvoie la liste de tous les repas' })
  async getMeals(): Promise<any> {
    return await this.mealsService.getMeals();
  }

  @UseGuards(RolesGuard)
  @Roles('user')
  @Get('active')
  @ApiOperation({ summary: 'Récupérer tous les repas actifs' })
  @ApiResponse({ status: 200, description: 'Renvoie la liste des repas actifs' })
  async getActiveMeals(): Promise<any> {
    return await this.mealsService.getActiveMeals();
  }

  @UseGuards(RolesGuard)
  @Roles('user')
  @Get('inactive')
  @ApiOperation({ summary: 'Récupérer tous les repas inactifs' })
  @ApiResponse({ status: 200, description: 'Renvoie la liste des repas inactifs' })
  async getInactiveMeals(): Promise<any> {
    return await this.mealsService.getInactiveMeals();
  }

  @UseGuards(RolesGuard)
  @Roles('user')
  @Get('my')
  @ApiOperation({ summary: 'Récupérer les repas de l\'utilisateur actuel' })
  @ApiResponse({ status: 200, description: 'Renvoie la liste des repas de l\'utilisateur actuel' })
  async getMyMeals(@Req() req): Promise<any> {
    return await this.mealsService.getMealsByUser(req.user.id);
  }

  @UseGuards(RolesGuard)
  @Roles('user')
  @Get('my-active')
  @ApiOperation({ summary: 'Récupérer les repas actifs de l\'utilisateur actuel' })
  @ApiResponse({ status: 200, description: 'Renvoie la liste des repas actifs de l\'utilisateur actuel' })
  async getMyActiveMeals(@Req() req): Promise<any> {
    return await this.mealsService.getActiveMealsByUser(req.user.id);
  }

  @UseGuards(RolesGuard)
  @Roles('user')
  @Get('my-inactive')
  @ApiOperation({ summary: 'Récupérer les repas inactifs de l\'utilisateur actuel' })
  @ApiResponse({ status: 200, description: 'Renvoie la liste des repas inactifs de l\'utilisateur actuel' })
  async getMyInactiveMeals(@Req() req): Promise<any> {
    return await this.mealsService.getInactiveMealsByUser(req.user.id);
  }

  @UseGuards(RolesGuard)
  @Roles('user')
  @Get('user/:uid')
  @ApiOperation({ summary: 'Récupérer les repas d\'un utilisateur spécifique' })
  @ApiParam({ name: 'uid', description: 'ID de l\'utilisateur' })
  @ApiResponse({ status: 200, description: 'Renvoie la liste des repas de l\'utilisateur spécifié' })
  async getMealsByUser(@Param('uid') uid: number): Promise<any> {
    return await this.mealsService.getMealsByUser(uid);
  }

  @UseGuards(RolesGuard)
  @Roles('user')
  @Get('user/:uid/active')
  @ApiOperation({ summary: 'Récupérer les repas actifs d\'un utilisateur spécifique' })
  @ApiParam({ name: 'uid', description: 'ID de l\'utilisateur' })
  @ApiResponse({ status: 200, description: 'Renvoie la liste des repas actifs de l\'utilisateur spécifié' })
  async getActiveMealsByUser(@Param('uid') uid: number): Promise<any> {
    return await this.mealsService.getActiveMealsByUser(uid);
  }

  @UseGuards(RolesGuard)
  @Roles('user')
  @Get('user/:uid/inactive')
  @ApiOperation({ summary: 'Récupérer les repas inactifs d\'un utilisateur spécifique' })
  @ApiParam({ name: 'uid', description: 'ID de l\'utilisateur' })
  @ApiResponse({ status: 200, description: 'Renvoie la liste des repas inactifs de l\'utilisateur spécifié' })
  async getInactiveMealsByUser(@Param('uid') uid: number): Promise<any> {
    return await this.mealsService.getInactiveMealsByUser(uid);
  }

  @UseGuards(RolesGuard)
  @Roles('user')
  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un repas par son ID' })
  @ApiParam({ name: 'id', description: 'ID du repas' })
  @ApiResponse({ status: 200, description: 'Renvoie le repas spécifié' })
  async getMealById(@Param('id') id: number): Promise<any> {
    return await this.mealsService.getMealById(id);
  }

  @UseGuards(RolesGuard)
  @Roles('user')
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un repas' })
  @ApiParam({ name: 'id', description: 'ID du repas' })
  @ApiResponse({ status: 200, description: 'Le repas a été supprimé avec succès' })
  @ApiResponse({ status: 403, description: 'Accès interdit' })
  async deleteMeal(@Req() req, @Param('id') id: number): Promise<any> {
    return await this.mealsService.deleteMeal(id, req.user.id);
  }

  @UseGuards(RolesGuard)
  @Roles('user')
  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un repas' })
  @ApiParam({ name: 'id', description: 'ID du repas' })
  @ApiResponse({ status: 200, description: 'Le repas a été mis à jour avec succès' })
  @ApiResponse({ status: 403, description: 'Accès interdit' })
  async updateMeal(@Param('id') id: number, @Req() req): Promise<any> {
    return await this.mealsService.updateMeal(id, req.user.id, req.body);
  }
}