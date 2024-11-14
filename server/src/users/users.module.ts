import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
