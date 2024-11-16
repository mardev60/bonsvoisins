import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { MealsModule } from './meals/meals.module';
import { CommandsModule } from './commands/commands.module';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    UsersModule, 
    MealsModule,
    CommandsModule
  ],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}