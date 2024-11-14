import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { user } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async checkFirstTime(user: { sub: string }): Promise<boolean> {

    const existingUser = await this.prisma.user.findUnique({
      where: { id_auth0: user.sub },
    });

    if (!existingUser) {
      await this.prisma.user.create({
        data: { id_auth0: user.sub },
      });
      return true;
    }

    const hasMissingDetails = !existingUser.first_name || !existingUser.last_name || !existingUser.phone;

    return hasMissingDetails;
  }

  async updateUserInfos(user: { sub: string }, data: { firstName: string, lastName: string, phone: string }): Promise<user> {
    return await this.prisma.user.update({
      where: { id_auth0: user.sub },
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,
      },
    });
  }
}
