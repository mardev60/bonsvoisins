import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  /**
   * Crée une nouvelle conversation dans la base de données.
   * 
   * @param idMeal - L'identifiant du repas associé à la conversation.
   * @param dateEnd - La date de fin de validité de la conversation.
   * 
   * Cette méthode insère une nouvelle entrée dans la table `conversation` 
   * avec l'identifiant du repas et la date de fin. Une exception est levée 
   * si l'insertion échoue.
   */
  async createConversation(idMeal: number, dateEnd: Date) {
    try {
      return await this.prisma.conversation.create({
        data: {
          id_meal: idMeal,
          date_end: dateEnd,
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to create conversation');
    }
  }

  /**
   * Récupère une conversation active associée à un repas spécifique.
   * 
   * @param idMeal - L'identifiant du repas.
   * 
   * Cette méthode vérifie d'abord si une conversation active existe pour 
   * l'identifiant de repas donné. Si oui, elle retourne la conversation, 
   * incluant ses messages et d'autres données liées, comme les commandes associées. 
   * Une exception est levée si aucune conversation active n'est trouvée.
   */
    // TODO : Il faudra rajouter une vérification pour savoir si l'utlisateur a droit d'acceder à la conversation
    // Ce sera fait quand on aura lié la table conversation avec la table commands (ou alors trouver solution alternative, j'en ai pas en tête)
  async getConversation(idMeal: string) {
    try {
      await this.doesActiveConversationExistsByMealId(idMeal);

      return await this.prisma.conversation.findFirst({
        where: { id_meal: parseInt(idMeal) },
        include: { 
          message: true,
          meal: { include: { command: true } },
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Envoie un message dans une conversation active.
   * 
   * @param idConversation - L'identifiant de la conversation.
   * @param idSender - L'identifiant de l'utilisateur expéditeur.
   * @param idReceiver - L'identifiant de l'utilisateur destinataire.
   * @param message - Le contenu du message à envoyer.
   * 
   * Cette méthode vérifie d'abord que la conversation est active. Ensuite, elle
   * s'assure que les utilisateurs expéditeur et destinataire existent. Si toutes 
   * les validations passent, le message est inséré dans la table `message`. 
   * Une exception est levée en cas de problème.
   */
    // TODO : Il faudra rajouter une vérification pour savoir si l'utlisateur a droit d'envoyer un message (il doit etre le collector ou le author)
    // Ce sera fait quand on aura lié la table conversation avec la table commands (ou alors trouver solution alternative, j'en ai pas en tête
  async sendMessage(
    idConversation: number,
    idSender: number,
    idReceiver: number,
    message: string,
  ) {
    try {
      await this.doesActiveConversationExists(idConversation);

      const [senderExists, receiverExists] = await Promise.all([
        this.prisma.user.findUnique({ where: { id: idSender } }),
        this.prisma.user.findUnique({ where: { id: idReceiver } }),
      ]);

      if (!senderExists || !receiverExists) {
        throw new BadRequestException('Sender or receiver does not exist');
      }

      return await this.prisma.message.create({
        data: {
          id_conversation: idConversation,
          id_receiver: idReceiver,
          id_sender: idSender,
          createdat: new Date(),
          content: message,
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Vérifie si une conversation active existe pour un identifiant de conversation donné.
   * 
   * @param conversationId - L'identifiant de la conversation.
   * 
   * Cette méthode cherche une conversation dans la base de données avec une date de fin 
   * postérieure ou égale à la date actuelle. Si aucune conversation active n'est trouvée, 
   * une exception est levée.
   */
  async doesActiveConversationExists(conversationId: number) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation || conversation.date_end < new Date()) {
      throw new BadRequestException('Active conversation does not exist');
    }
  }

  /**
   * Vérifie si une conversation active existe pour un identifiant de repas donné.
   * 
   * @param mealId - L'identifiant du repas.
   * 
   * Cette méthode cherche une conversation dans la base de données associée à un repas 
   * spécifique avec une date de fin postérieure ou égale à la date actuelle. Si aucune 
   * conversation active n'est trouvée, une exception est levée.
   */
  async doesActiveConversationExistsByMealId(mealId: string) {
    const conversation = await this.prisma.conversation.findFirst({
      where: {
        id_meal: parseInt(mealId),
        date_end: { gte: new Date() },
      },
    });

    if (!conversation) {
      throw new BadRequestException('Active conversation does not exist');
    }
  }
}
