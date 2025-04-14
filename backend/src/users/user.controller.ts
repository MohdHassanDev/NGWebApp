import { Controller, Request, UseGuards, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.usersService.findOneById(req.user.userId);
    if (!user) {
      return null;
    }
    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile/all')
  async getAllProfiles(@Request() req) {
    const users = await this.usersService.findAll();
    if (!users) {
      return null;
    }
    return users;
  }
}
