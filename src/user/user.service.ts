import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(accountName: string, password: string): Promise<User> {
    const user = await this.findByAccountName(accountName);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async findByAccountName(accountName: string): Promise<User> {
    return this.userRepository.findOne({ where: { accountName } });
  }

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.accountName = createUserDto.accountName;
    user.nickName = createUserDto.nickName;
    user.password = await bcrypt.hash(createUserDto.password, 10);
    return this.userRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: parseInt(id),
      },
    });
    user.nickName = updateUserDto.nickName;
    user.password = await bcrypt.hash(updateUserDto.password, 10);
    return this.userRepository.save(user);
  }

  async delete(id: string) {
    return this.userRepository.delete(id);
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: parseInt(id),
      },
    });
    return user;
  }
  async findAll(page = 1, pageSize = 10): Promise<User[]> {
    const userList = await this.userRepository.find({
      select: ['id', 'accountName', 'nickName'],
      skip: pageSize * (page - 1),
      take: pageSize,
    });
    return userList;
  }
}
