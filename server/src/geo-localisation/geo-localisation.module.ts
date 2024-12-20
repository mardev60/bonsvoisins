import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { GeoLocalisationController } from './geo-localisation.controller';
import { GeoLocalisationService } from './geo-localisation.service';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, CacheModule.register()],
  controllers: [GeoLocalisationController],
  providers: [PrismaService, UsersService, GeoLocalisationService],
})
export class GeoLocalisationModule {}