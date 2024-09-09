import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello! This is NESTJS Backend API - tsoc24';
  }
}
