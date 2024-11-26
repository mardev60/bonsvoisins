import { Injectable, BadRequestException } from "@nestjs/common";
import { command } from "@prisma/client";
import { MealsService } from "src/meals/meals.service";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class CommandsService {
  constructor(
    private readonly prisma: PrismaService, 
    private mealService: MealsService
  ) {}

  /**
   * Crée une nouvelle commande pour un repas spécifié par `mealId`.
   * @param mealId - L'identifiant du repas à commander.
   * @param userId - L'identifiant de l'utilisateur qui passe la commande.
   * @returns La commande créée.
   * @throws {BadRequestException} Si les données sont invalides ou si le repas a expiré.
   */
  async createCommand(mealId: number, userId: number): Promise<command> {
    if(!mealId || !userId) {
      throw new BadRequestException('Les données ne sont pas conformes pour créer une commande.');
    }

    const mealToCommand = await this.mealService.getMealById(mealId);

    if (!mealToCommand || mealToCommand.date_end < new Date()) {
      throw new BadRequestException('Le repas n\' est pas existant ou a expiré.');
    }

    // TODO: Appeler le service Conversation pour démarrer une conversation vierge (quand il sera implémenté).
    await this.prisma.conversation.create({
      data: {
        id_meal: Number(mealId),
      },
    });

    const disabledMeal = await this.mealService.disableMeal(mealId);

    if (!disabledMeal.success) {
      throw new BadRequestException('The meal could not be disabled.');
    }

    return this.prisma.command.create({
      data: {
        id_collector: Number(userId),
        id_meal: Number(mealId),
      },
    });
  }

  /**
   * Collecte une commande en vérifiant le code de collecte.
   * @param userId - L'identifiant de l'utilisateur qui collecte la commande.
   * @param commandId - L'identifiant de la commande à collecter.
   * @param collect_code - Le code de collecte à vérifier.
   * @returns La commande mise à jour avec la date de collecte.
   * @throws {BadRequestException} Si les données ou le code sont invalides.
   */
  async collectCommand(userId: number, commandId: number, collect_code: string): Promise<command> {

    if(!userId || !commandId || !collect_code) {
      throw new BadRequestException('Les données ne sont pas conformes pour collecter une commande.');
    }

    const commandToCollect = await this.prisma.command.findUnique({
      where: {
        id: Number(commandId),
        id_collector: Number(userId),
        collectedat: null,
      },
      include: {
        meal: true,
      },
    });

    if (!userId || !commandToCollect || !commandToCollect.meal.is_active) {
      throw new BadRequestException('Les données ne sont pas conformes pour collecter une commande.');
    }

    if (commandToCollect.meal.collect_code !== collect_code) {
      throw new BadRequestException('Le code de collecte est incorrect.');
    }

    return this.prisma.command.update({
      where: {
        id: Number(commandId),
      },
      data: {
        collectedat: new Date(),
      },
    });
  }

  /**
   * Récupère la liste des commandes en attente de collecte pour un utilisateur.
   * @param userId - L'identifiant de l'utilisateur.
   * @returns Un tableau de commandes à collecter.
   */
  async commandsToCollect(userId: number): Promise<command[]> {
    return this.prisma.command.findMany({
      where: {
        id_collector: Number(userId),
        collectedat: null,
      },
      include: {
        meal: true,
      },
    });
  }

  /**
   * Récupère l'historique des commandes collectées pour un utilisateur.
   * @param userId - L'identifiant de l'utilisateur.
   * @returns Un tableau de commandes collectées.
   */
  async commandsCollected(userId: number): Promise<command[]> {
    return this.prisma.command.findMany({
      where: {
        id_collector: Number(userId),
        collectedat: {
          not: null,
        },
      },
      include: {
        meal: true,
      },
    });
  }

  /**
   * Renvoie toutes les commandes d'un utilisateur.
   * @param userId - L'identifiant de l'utilisateur.
   * @returns Un tableau de commandes (collectées ou non).
   */
    async allUserCommands(userId: number): Promise<command[]> {
      return this.prisma.command.findMany({
        where: {
          id_collector: Number(userId),
        },
        include: {
          meal: {
            include: {
              user: true
            }
          }
        },
      });
    }
}