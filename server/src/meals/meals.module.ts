import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MealsController } from './meals.controller';
import { MealsService } from './meals.service';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [ConfigModule.forRoot(), CacheModule.register()],
  controllers: [MealsController],
  providers: [MealsService, PrismaService, UsersService],
})
export class MealsModule {}