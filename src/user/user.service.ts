import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';

export interface User {
  id: number | string;
  accountName: string;
  nickName: string;
  password: string;
  delete: '0' | '1';
}

export interface UserInfo {
  id: number | string;
  accountName: string;
  nickName: string;
}

const users: User[] = [
  {
    id: 1,
    accountName: 'default',
    nickName: '默认账号',
    password: 'admin',
    delete: '0',
  },
];

@Injectable()
export class UserService {
  public create(createUserDto: CreateUserDto) {
    const user: User = {
      id: users.length + 1,
      accountName: createUserDto.accountName,
      nickName: createUserDto.nickName,
      password: createUserDto.password,
      delete: '0',
    };
    users.push(user);
    return {
      statusCode: 200,
      message: 'add user success !',
    };
  }

  public update(id: string, updateUserDto: UpdateUserDto) {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex > -1) {
      if (updateUserDto.accountName)
        users[userIndex].accountName = updateUserDto.accountName;
      if (updateUserDto.password)
        users[userIndex].password = updateUserDto.password;
      return {
        statusCode: 200,
        message: 'update user success !',
      };
    }
    throw new HttpException('用户不存在', HttpStatus.FORBIDDEN);
  }

  public delete(id: string) {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex > -1) {
      users[userIndex].delete = '1';
      return {
        statusCode: 200,
        message: 'delete user success !',
      };
    }
    throw new HttpException('用户不存在', HttpStatus.FORBIDDEN);
  }

  public findOne(id: string) {
    const userIndex = users.findIndex((user) => user.id === +id);
    if (userIndex > -1) {
      const user = users[userIndex];
      const userInfo: UserInfo = {
        id: user.id,
        accountName: user.accountName,
        nickName: user.accountName,
      };
      return userInfo;
    }
    throw new HttpException('用户不存在', HttpStatus.FORBIDDEN);
  }
  public findAll(page: number = 1, pageSize: number = 10) {
    const userInfoList: UserInfo[] = users
      .filter((user) => user.delete === '0')
      .map((user) => {
        return {
          id: user.id,
          accountName: user.accountName,
          nickName: user.nickName,
        };
      });
    return userInfoList;
  }
}
