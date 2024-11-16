import { Injectable } from '@nestjs/common';
import { meal } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { generateRandomCode } from 'src/utils/generate-random-code';

@Injectable()
export class MealsService {
  constructor(private readonly prisma: PrismaService) {}

  async createMeal(data: any, userId: number): Promise<meal> {
    if (!userId) {
      throw new Error('User ID is required to create a meal');
    }

    return await this.prisma.meal.create({
      data: {
        ...data,
        collect_code: generateRandomCode(),
        id_author: Number(userId),
      },
    });
  }

  async getMeals(): Promise<meal[]> {
    return await this.prisma.meal.findMany({
      orderBy: {
        date_end: 'asc',
      },
    });
  }

  async getActiveMeals(): Promise<meal[]> {
    const now = new Date();
    return await this.prisma.meal.findMany({
      where: {
        // Active = date_start < now < date_end
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

  async getInactiveMeals(): Promise<meal[]> {
    const now = new Date();
    return await this.prisma.meal.findMany({
      where: {
        // Inactive = date_end < now
        date_end: {
          lt: now,
        },
      },
      orderBy: {
        date_end: 'asc',
      },
    });
  }

  async getMealsByUser(uid: number): Promise<meal[]> {
    return await this.prisma.meal.findMany({
      where: { id_author: Number(uid) },
      orderBy: {
        date_end: 'asc',
      },
    });
  }

  async getActiveMealsByUser(uid: number): Promise<meal[]> {
    const now = new Date();
    return await this.prisma.meal.findMany({
      where: {
        id_author: Number(uid),

        // Active = date_start < now < date_end
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

  async getInactiveMealsByUser(uid: number): Promise<meal[]> {
    const now = new Date();
    return await this.prisma.meal.findMany({
      where: {
        id_author: Number(uid),

        // Inactive = date_end < now
        date_end: {
          lt: now,
        },
      },
      orderBy: {
        date_end: 'asc',
      },
    });
  }

  async getMealById(id: number): Promise<meal> {
    return await this.prisma.meal.findUnique({
      where: { id: Number(id) },
    });
  }

  async deleteMeal(id: number, userId: number): Promise<meal> {
    return await this.prisma.meal.delete({
      where: {
        id: Number(id),
        id_author: Number(userId),
      },
    });
  }

  async updateMeal(id: number, userId: number, data: any): Promise<meal> {
    return await this.prisma.meal.update({
      where: {
        id: Number(id),
        id_author: Number(userId),
      },
      data,
    });
  }

  async desactivateMeal(id: number): Promise<meal> {
    return await this.prisma.meal.update({
      where: {
        id: Number(id),
      },
      data: {
        is_active: false,
      },
    })
  }
}
