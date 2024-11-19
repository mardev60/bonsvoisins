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
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
    async getConversation(@Param('mealId') mealId: string) {
      try {
        return await this.conversationService.getConversation(mealId);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
  
    @Post('/message/:mealId')
    @UseGuards(AuthorizationGuard, RolesGuard)
    @Roles('user')
    async sendMessage(
      @Req() req,
      @Param('conversationId') conversationId: number,
      @Body() sendMessageDto: SendMessageDto,
    ) {
      try {
        const { idReceiver, message } = sendMessageDto;
        return await this.conversationService.sendMessage(
          Number(conversationId),
          req.user.id,
          idReceiver,
          message,
        );
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
  }  