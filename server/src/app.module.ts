import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { MealsModule } from './meals/meals.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, MealsModule],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}