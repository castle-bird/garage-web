import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ==================== Middleware / Pipe 등록 Start ====================

  // 1. 쿠키 파싱 (Middleware)
  // Spring은 @CookieValue로 바로 읽지만, Nest(Express)는 파서를 등록해야 req.cookies가 채워짐
  app.use(cookieParser());

  // 2. 요청 검증·변환 (Global Pipe) → DTO 관련
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 선언되지 않은 필드는 제거
      transform: true, // Spring에서는 Jackson이 해주던 Object → DTO 변환
    }),
  );

  // 3. ...

  // ==================== Middleware / Pipe 등록 End ====================

  await app.listen(process.env.PORT ?? 3000);
}

await bootstrap();
