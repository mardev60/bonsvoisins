import { Controller, Get, Post, Put, Req, UseGuards, BadRequestException } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthorizationGuard } from "src/guards/authorization.guard";
import { Roles } from "src/guards/roles.decorator";
import { RolesGuard } from "src/guards/roles.guard";
import { CommandsService } from "./commands.service";

@ApiTags('commands')
@ApiBearerAuth()
@Controller('commands')
export class CommandsController {
  constructor(private commandsService: CommandsService) {}

  @UseGuards(AuthorizationGuard, RolesGuard)
  @Roles('user')
  @Post('/:mealId')
  @ApiOperation({ summary: 'Créer une commande' })
  @ApiResponse({ status: 201, description: 'Commande créée avec succès.' })
  @ApiResponse({ status: 400, description: 'Les données fournies ne sont pas conformes.' })
  async createCommand(@Req() req): Promise<any> {
    try {
      return await this.commandsService.createCommand(req.params.mealId, req.user.id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(AuthorizationGuard, RolesGuard)
  @Roles('user')
  @Put('/collect')
  @ApiOperation({ summary: 'Collecter une commande' })
  @ApiResponse({ status: 200, description: 'Commande collectée avec succès.' })
  @ApiResponse({ status: 400, description: 'Le code de collecte est incorrect ou la commande n\'existe pas.' })
  async collectCommand(@Req() req): Promise<any> {
    try {
      return await this.commandsService.collectCommand(req.user.id, req.body.id, req.body.collect_code);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(AuthorizationGuard, RolesGuard)
  @Roles('user')
  @Get('/to-collect')
  @ApiOperation({ summary: 'Lister les commandes à collecter' })
  @ApiResponse({ status: 200, description: 'Liste des commandes en attente de collecte.' })
  async getCommandsToCollect(@Req() req): Promise<any> {
    return await this.commandsService.commandsToCollect(req.user.id);
  }

  @UseGuards(AuthorizationGuard, RolesGuard)
  @Roles('user')
  @Get('/collected')
  @ApiOperation({ summary: 'Lister l\'historique des commandes collectées' })
  @ApiResponse({ status: 200, description: 'Liste des commandes collectées.' })
  async getCommandsHistory(@Req() req): Promise<any> {
    return await this.commandsService.commandsCollected(req.user.id);
  }
}