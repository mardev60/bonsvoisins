import { Injectable } from '@nestjs/common';
import { meal } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { generateRandomCode } from 'src/utils/generate-random-code';

@Injectable()
export class MealsService {
  constructor(private readonly prisma: PrismaService) {}

/**
 * Crée un nouveau repas pour un utilisateur spécifié par `userId`.
 * @param data - Les données nécessaires pour créer un repas (ex : titre, description, etc.).
 * @param userId - L'identifiant de l'utilisateur qui crée le repas.
 * @returns Le repas créé.
 * @throws {Error} Si l'identifiant de l'utilisateur est manquant.
 */
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

/**
 * Récupère la liste des repas disponibles, triés par date de fin dans l'ordre croissant.
 * @returns Un tableau de repas (`meal[]`).
 */
  async getMeals(): Promise<meal[]> {
    return await this.prisma.meal.findMany({
      orderBy: {
        date_end: 'asc',
      },
    });
  }

/**
 * Récupère la liste des repas actifs, triés par date de fin dans l'ordre croissant.
 * Un repas est considéré comme actif si sa date de début est passée, sa date de fin n'est pas encore atteinte, et la propriété `is_active` est définie sur `true`.
 * @returns Un tableau de repas actifs (`meal[]`).
 */
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
        is_active: true,
      },
      orderBy: {
        date_end: 'asc',
      },
    });
  }

/**
 * Récupère la liste des repas inactifs, triés par date de fin dans l'ordre croissant.
 * Un repas est considéré comme inactif si sa date de début n'est pas encore atteinte, sa date de fin est passée ou que la propriété `is_active` est définie sur `false`.
 * @returns Un tableau de repas inactifs (`meal[]`).
 */
  async getInactiveMeals(): Promise<meal[]> {
    const now = new Date();
    return await this.prisma.meal.findMany({
      where: {
        date_end: {
          lt: now,
        },
        is_active: false,
      },
      orderBy: {
        date_end: 'asc',
      },
    });
  }

/**
 * Récupère la liste des repas créés par un utilisateur spécifique, triés par date de fin dans l'ordre croissant.
 * @param uid - L'identifiant unique de l'utilisateur (auteur des repas).
 * @returns Un tableau de repas créés par l'utilisateur (`meal[]`).
 */
  async getMealsByUser(uid: number): Promise<meal[]> {
    return await this.prisma.meal.findMany({
      where: { id_author: Number(uid) },
      orderBy: {
        date_end: 'asc',
      },
      include: {
        user: true,
        command: {include : {user: true}}
      }
    });
  }

/**
 * Récupère la liste des repas actifs créés par un utilisateur spécifique, triés par date de fin dans l'ordre croissant.
 * Un repas est considéré comme actif si sa date de début est passée, sa date de fin n'est pas encore atteinte, et la propriété `is_active` est définie sur `true`.
 * @param uid - L'identifiant unique de l'utilisateur (auteur des repas).
 * @returns Un tableau de repas actifs créés par l'utilisateur (`meal[]`).
 */
  async getActiveMealsByUser(uid: number): Promise<meal[]> {
    const now = new Date();
    return await this.prisma.meal.findMany({
      where: {
        id_author: Number(uid),
        date_start: {
          lte: now,
        },
        date_end: {
          gte: now,
        },
        is_active: true,
      },
      orderBy: {
        date_end: 'asc',
      },
    });
  }

/**
 * Récupère la liste des repas inactifs créés par un utilisateur spécifique, triés par date de fin dans l'ordre croissant.
 * Un repas est considéré comme inactif si sa date de début n'est pas encore atteinte, sa date de fin est passée ou que la propriété `is_active` est définie sur `false`.
 * @param uid - L'identifiant unique de l'utilisateur (auteur des repas).
 * @returns Un tableau de repas inactifs créés par l'utilisateur (`meal[]`).
 */
  async getInactiveMealsByUser(uid: number): Promise<meal[]> {
    const now = new Date();
    return await this.prisma.meal.findMany({
      where: {
        id_author: Number(uid),
        date_end: {
          lt: now,
        },
        is_active: false,
      },
      orderBy: {
        date_end: 'asc',
      },
    });
  }

/**
 * Récupère un repas spécifique par son identifiant.
 * @param id - L'identifiant du repas à récupérer.
 * @returns Le repas trouvé, ou `null` si aucun repas n'est trouvé.
 */
  async getMealById(id: number): Promise<meal> {
    return await this.prisma.meal.findUnique({
      where: { id: Number(id) },
    });
  }

/**
 * Supprime un repas spécifique créé par un utilisateur.
 * @param id - L'identifiant du repas à supprimer.
 * @param userId - L'identifiant de l'utilisateur qui a créé le repas.
 * @returns Le repas supprimé.
 * @throws {BadRequestException} Si l'utilisateur n'est pas l'auteur du repas.
 */
  async deleteMeal(id: number, userId: number): Promise<meal> {
    return await this.prisma.meal.delete({
      where: {
        id: Number(id),
        id_author: Number(userId),
      },
    });
  }

/**
 * Met à jour un repas spécifique créé par un utilisateur.
 * @param id - L'identifiant du repas à mettre à jour.
 * @param userId - L'identifiant de l'utilisateur qui a créé le repas.
 * @param data - Les nouvelles données à mettre à jour.
 * @returns Le repas mis à jour.
 * @throws {BadRequestException} Si l'utilisateur n'est pas l'auteur du repas.
 */
  async updateMeal(id: number, userId: number, data: any): Promise<meal> {
    return await this.prisma.meal.update({
      where: {
        id: Number(id),
        id_author: Number(userId),
      },
      data,
    });
  }

/**
 * Désactive un repas spécifique en le marquant comme inactif.
 * @param id - L'identifiant du repas à désactiver.
 * @returns Un objet indiquant si l'opération a réussi ou échoué.
 */
  async disableMeal(id: number): Promise<any> {
    const meal = await this.prisma.meal.findUnique({
      where: {
        id: Number(id),
      },
    });
  
    if (!meal) {
      return { success: false, message: 'Meal not found' };
    }
  
    if (!meal.is_active) {
      return { success: false, message: 'Meal is already desactivated' };
    }

    const updatedMeal = await this.prisma.meal.update({
      where: {
        id: Number(id),
      },
      data: {
        is_active: false,
      },
    });

    return { success: true, message: 'Meal deactivated successfully', meal: updatedMeal };
  }
}
