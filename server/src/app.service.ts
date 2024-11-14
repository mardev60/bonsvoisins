import { Injectable } from '@nestjs/common';
import { response } from 'express';
import { json } from 'stream/consumers';

@Injectable()
export class AppService {
  getHello(): any {
    return { message: 'Hello World!' };
  }
}
