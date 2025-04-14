import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppVersion(): string {
    return 'NGWebApp Version: 1.0.0';
  }
}
