import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async authenticate(credentials: { username: string; password: string }) {
    // 这里可以根据自己的业务逻辑进行身份验证
    // TODO
    // 如果验证成功，生成一个 JWT 并返回
    const payload = { username: credentials.username };
    return this.jwtService.sign(payload);
  }
}
