import {
  CanActivate,
  ExecutionContext,
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

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const validateAccessToken = promisify(auth({
      issuer: process.env.ISSUER_BASE_URL,
      audience: process.env.AUDIENCE,
    }));

    try {
      await validateAccessToken(request, response);
      const userInfo = await this.getUserInfo(request.headers.authorization);
      const userWithRoles = await this.usersService.getUserWithRoles(userInfo.sub);

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
      throw new InternalServerErrorException();
    }
  }

  private async getUserInfo(authorizationHeader: string): Promise<any> {
    const token = authorizationHeader.split(' ')[1];
    
    try {
      const response = await axios.get(`${process.env.ISSUER_BASE_URL}` + 'userinfo', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch user information');
    }
  }
}