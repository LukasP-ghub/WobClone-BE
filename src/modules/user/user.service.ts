import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { RegisterUserResponse } from '../../types/user';
import { hashPwd } from '../../utils/hash-pwd';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

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


  async update(user: User, userData: UpdateUserDto) {
    if (userData?.pwdHash) userData.pwdHash = hashPwd(userData.pwdHash);
    await this.userRepository.update(user.user_id, userData);
    return 'updated';
  }

  async remove(user: User) {
    await this.userRepository.remove(user);
    return 'user removed';
  }
}
