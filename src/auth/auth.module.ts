import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'my-secret-key', // 这里可以使用自己的密钥
      signOptions: { expiresIn: '1h' }, // 设置 JWT 的过期时间
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
