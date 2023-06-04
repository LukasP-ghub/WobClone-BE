import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPwd } from '../utils/hash-pwd';
import { RegisterUserResponse } from '../types/user';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>) { }

  filterUser(user: User): RegisterUserResponse {
    const { email, user_id } = user;
    return { user_id, email };
  }

  async register(newUser: RegisterDto): Promise<RegisterUserResponse> {
    console.log(newUser);

    const user = new User();
    user.email = newUser.email;
    user.pwdHash = hashPwd(newUser.pwd);
    user.role = 'user';
    user.user_id = uuid();

    await this.userRepository.save(user);
    return this.filterUser(user);
  }

  async getOneUser(user_id: string): Promise<User> {
    return await this.userRepository.findOneBy({ user_id });
  }
}
