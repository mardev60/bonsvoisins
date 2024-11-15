import { Injectable } from '@nestjs/common';
import { meal } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MealsService {
  constructor(private readonly prisma: PrismaService) {}

  async getActiveMeals(): Promise<meal[]> {
    const now = new Date();
    return await this.prisma.meal.findMany({
      where: {
        date_start: {
          lte: now,
        },
        date_end: {
          gte: now,
        },
      },
      orderBy: {
        date_end: 'asc',
      },
    });
  }

  async getAllMyMeals(user: { sub: string }): Promise<meal[]> {
    // Récupérer l'utilisateur en fonction de l'id_auth0 (user.sub)
    const currentUser = await this.prisma.user.findUnique({
      where: { id_auth0: user.sub },
    });

    if (!currentUser) {
      throw new Error('User not found');
    }

    return await this.prisma.meal.findMany({
      where: { id_author: currentUser.id },
      orderBy: {
        date_end: 'asc',
      },
    });
  }
}
