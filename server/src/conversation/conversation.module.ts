import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ConversationController],
  providers: [PrismaService, ConversationService, UsersService],
})
export class ConversationModule {}