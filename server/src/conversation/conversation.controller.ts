import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { ConversationService } from './conversation.service';
import { SendMessageDto } from './dtos/send-message.dto';

@ApiTags('Conversation')
@ApiBearerAuth()
@Controller('conversation')
export class ConversationController {
  constructor(private conversationService: ConversationService) {}

  @Get('/:mealId')
  @UseGuards(AuthorizationGuard, RolesGuard)
  @Roles('user')
  @ApiOperation({ summary: 'Récupérer une conversation' })
  @ApiParam({
    name: 'mealId',
    description: 'Identifiant du repas associé à la conversation',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Conversation récupérée avec succès.',
  })
  @ApiResponse({
    status: 400,
    description: 'Requête invalide.',
  })
  @ApiResponse({
    status: 401,
    description: 'Non autorisé.',
  })
  async getConversation(@Param('mealId') mealId: string) {
    try {
      return await this.conversationService.getConversation(mealId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('/message/:conversationId')
  @UseGuards(AuthorizationGuard, RolesGuard)
  @Roles('user')
  @ApiOperation({ summary: 'Envoyer un message dans une conversation' })
  @ApiParam({
    name: 'conversationId',
    description: 'Identifiant de la conversation',
    type: String,
  })
  @ApiBody({
    type: SendMessageDto,
    description: 'Données nécessaires pour envoyer un message',
  })
  @ApiResponse({
    status: 201,
    description: 'Message envoyé avec succès.',
  })
  @ApiResponse({
    status: 400,
    description: 'Requête invalide.',
  })
  @ApiResponse({
    status: 401,
    description: 'Non autorisé.',
  })
  async sendMessage(
    @Req() req,
    @Param('conversationId') conversationId: string,
    @Body() sendMessageDto: SendMessageDto,
  ) {
    try {
      const { idReceiver, message } = sendMessageDto;
      return await this.conversationService.sendMessage(
        parseInt(conversationId),
        req.user.id,
        idReceiver,
        message,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}