import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CommandsController } from './commands.controller';
import { CommandsService } from './commands.service';
import { MealsService } from 'src/meals/meals.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [ConfigModule.forRoot(), CacheModule.register()],
  controllers: [CommandsController],
  providers: [CommandsService, PrismaService, UsersService, MealsService],
})
export class CommandsModule {}