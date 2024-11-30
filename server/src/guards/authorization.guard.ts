import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  auth,
  InvalidTokenError,
  UnauthorizedError,
} from 'express-oauth2-jwt-bearer';
import { promisify } from 'util';
import axios from 'axios';
import { UsersService } from 'src/users/users.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const validateAccessToken = promisify(
      auth({
        issuer: process.env.ISSUER_BASE_URL,
        audience: process.env.AUDIENCE,
      }),
    );

    try {
      await validateAccessToken(request, response);

      const token = request.headers.authorization;

      let userInfo: any = await this.cacheManager.get(`user:${token}`);

      if (!userInfo) {
        userInfo = await this.getUserInfo(token);
        await this.cacheManager.set(`user:${token}`, userInfo, 60000);
      }
      const userWithRoles = await this.usersService.getUserWithRoles(
        userInfo.sub,
      );

      request.user = {
        id: userWithRoles.id,
        ...userInfo,
        roles: userWithRoles.roles,
      };

      return true;
    } catch (error) {
      if (error instanceof InvalidTokenError) {
        throw new UnauthorizedException('Bad credentials');
      }

      if (error instanceof UnauthorizedError) {
        throw new UnauthorizedException('Requires authentication');
      }
      throw new InternalServerErrorException(error);
    }
  }

  private async getUserInfo(authorizationHeader: string): Promise<any> {
    const token = authorizationHeader.split(' ')[1];

    try {
      const response = await axios.get(
        `${process.env.ISSUER_BASE_URL}` + 'userinfo',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch user information',
      );
    }
  }
}
