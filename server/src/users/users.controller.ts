import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthorizationGuard } from 'src/guards/authorization.guard';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthorizationGuard)
  @Post('check-first-time')
  @ApiOperation({ summary: 'Vérifie si l\'utilisateur se connecte pour la première fois' })
  @ApiResponse({ status: 200, description: 'Retourne true si c\'est la première connexion ou des informations manquantes, sinon false.' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  async checkFirstTime(@Req() req): Promise<boolean> {
    return await this.usersService.checkFirstTime(req.user);
  }

  @UseGuards(AuthorizationGuard)
  @Post('update-user-infos')
  @ApiOperation({ summary: 'Met à jour les informations de l\'utilisateur' })
  @ApiResponse({ status: 200, description: 'Retourne l\'utilisateur mis à jour avec ses nouveaux rôles.' })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  async updateUserInfos(@Req() req): Promise<any> {
    return await this.usersService.updateUserInfos(req.user, req.body);
  }
}