import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { MealsModule } from './meals/meals.module';
import { CommandsModule } from './commands/commands.module';
import { GeoLocalisationModule } from './geo-localisation/geo-localisation.module';
import { ConversationModule } from './conversation/conversation.module';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    UsersModule, 
    MealsModule,
    CommandsModule,
    GeoLocalisationModule,
    ConversationModule
  ],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}