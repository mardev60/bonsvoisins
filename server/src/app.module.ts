import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { MealsController } from './meals/meals.controller';
import { MealsService } from './meals/meals.service';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule],
  controllers: [MealsController],
  providers: [PrismaService, MealsService],
  exports: [PrismaService],
})
export class AppModule {}