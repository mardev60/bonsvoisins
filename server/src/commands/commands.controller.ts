import { Controller, Get, Post, Put, Req, UseGuards, BadRequestException } from "@nestjs/common";
import { AuthorizationGuard } from "src/guards/authorization.guard";
import { Roles } from "src/guards/roles.decorator";
import { RolesGuard } from "src/guards/roles.guard";
import { CommandsService } from "./commands.service";

@Controller('commands')
export class CommandsController {
  constructor(private commandsService: CommandsService) {}

  @UseGuards(AuthorizationGuard, RolesGuard)
  @Roles('user')
  @Post('/:mealId')
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
  async getCommandsToCollect(@Req() req): Promise<any> {
    return await this.commandsService.commandsToCollect(req.user.id);
  }

  @UseGuards(AuthorizationGuard, RolesGuard)
  @Roles('user')
  @Get('/collected')
  async getCommandsHistory(@Req() req): Promise<any> {
    return await this.commandsService.commandsCollected(req.user.id);
  }
}