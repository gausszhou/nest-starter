import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // 全局路由前缀
  app.enableVersioning({ // 版本控制
    type: VersioningType.URI,
  })
  await app.listen(3000);
  console.log('http://localhost:3000');
}
bootstrap();
