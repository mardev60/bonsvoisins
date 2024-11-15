import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MealsController } from './meals.controller';
import { MealsService } from './meals.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [MealsController],
  providers: [MealsService, PrismaService],
})
export class MealsModule {}