import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  async findAll(): Promise<User[] | undefined> {
    return this.userModel.find().exec();
  }

  async findOneById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id).exec();
  }

  async createUser(user: Partial<User>): Promise<User> {
    const existingUser = await this.userModel.findOne({
      $or: [{ username: user.username }, { email: user.email }],
    });
    if (existingUser) {
      throw new HttpException(
        'Username or email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(user.password, saltRounds);

    const createdUser = new this.userModel({
      ...user,
      password: passwordHash,
    });
    return createdUser.save();
  }
}
