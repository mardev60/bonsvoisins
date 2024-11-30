import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { filterValidData } from 'src/utils/filter-not-empty-data';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Vérifie si c'est la première connexion de l'utilisateur et lui attribue le rôle 'new-user'
   * si l'utilisateur n'existe pas encore, ou s'il lui manque des informations.
   * 
   * @param user L'utilisateur à vérifier (contient l'id Auth0)
   * @returns true si l'utilisateur est nouveau ou a des informations manquantes, sinon false.
   */
  async checkFirstTime(user: { sub: string, picture: string }): Promise<boolean> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id_auth0: user.sub },
      include: { user_role: true },
    });

    if (!existingUser) {
      await this.prisma.user.create({
        data: {
          id_auth0: user.sub,
          avatar: user.picture,
          user_role: {
            create: { role_id: 3 },
          },
        },
      });
      return true;
    }

    const hasMissingDetails = !existingUser.first_name || !existingUser.last_name || !existingUser.phone;

    if (hasMissingDetails) {
      await this.ensureNewUserRole(existingUser.id);
      return true;
    }

    return false;
  }

  /**
   * Met à jour les informations d'un utilisateur (prénom, nom, téléphone) et 
   * si l'utilisateur avait le rôle 'new-user', celui-ci est remplacé par le rôle 'user'.
   * 
   * @param user L'utilisateur dont les informations doivent être mises à jour
   * @param data Les nouvelles informations de l'utilisateur (prénom, nom, téléphone)
   * @returns L'utilisateur mis à jour avec ses nouveaux rôles
   */
  async updateUserInfos(user: { sub: string }, data: { firstName?: string, lastName?: string, phone?: string, photo?: string | null }): Promise<any> {
  
    const updateData = filterValidData({
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
      avatar: data.photo,
    });

    const updatedUser = await this.prisma.user.update({
      where: { id_auth0: user.sub },
      data: updateData, 
      include: { user_role: true },
    });

    if (updatedUser.user_role.some(role => role.role_id === 3)) {
      await this.removeNewUserRole(updatedUser.id);
    }

    return updatedUser;
  }

  /**
   * Récupère un utilisateur avec ses rôles associés à partir de son id Auth0.
   * 
   * @param auth0Id L'id Auth0 de l'utilisateur
   * @returns L'utilisateur avec ses rôles associés sous forme de tableau de noms de rôles
   */
  async getUserWithRoles(auth0Id: string): Promise<any> {
    const userWithRoles = await this.prisma.user.findUnique({
      where: { id_auth0: auth0Id },
      include: {
        user_role: {
          include: {
            role: true,
          },
        },
      },
    });

    return {
      ...userWithRoles,
      roles: userWithRoles?.user_role?.map(ur => ur.role.name) || [],
    };
  }

  async getMe(id: number): Promise<any> {
    const me = await this.prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        meal: true,
      },
    });

    return me;
  }

   /**
   * Assure que l'utilisateur a bien le rôle 'new-user'.
   * Si ce rôle n'est pas déjà présent, il est ajouté à l'utilisateur.
   * 
   * @param userId L'id de l'utilisateur pour lequel on vérifie le rôle
   */
   private async ensureNewUserRole(userId: number): Promise<void> {
    const userRoles = await this.prisma.user_role.findMany({
      where: { user_id: userId },
    });
    const hasNewUserRole = userRoles.some(role => role.role_id === 3);

    if (!hasNewUserRole) {
      await this.prisma.user_role.create({
        data: {
          user_id: userId,
          role_id: 3,
        },
      });
    }
  }

  /**
   * Supprime le rôle 'new-user' de l'utilisateur et lui attribue le rôle 'user' (id: 2) 
   * une fois qu'il a complété ses informations.
   * 
   * @param userId L'id de l'utilisateur à mettre à jour
   */
  private async removeNewUserRole(userId: number): Promise<void> {
    await this.prisma.user_role.deleteMany({
      where: {
        user_id: userId,
        role_id: 3,
      },
    });

    await this.prisma.user_role.create({
      data: {
        user_id: userId,
        role_id: 2,
      },
    });
  }
}