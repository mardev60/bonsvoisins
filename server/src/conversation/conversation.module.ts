import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CacheModule } from '@nestjs/cache-manager';
import { ConversationGateway } from './conversation.gateway';

@Module({
  imports: [ConfigModule.forRoot(), CacheModule.register()],
  controllers: [ConversationController],
  providers: [PrismaService, ConversationService, UsersService, ConversationGateway],
})
export class ConversationModule {}