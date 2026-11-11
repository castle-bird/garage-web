import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module.js';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env', // backend/ 기준
      expandVariables: true, // .env에서 ${} 사용가능
    }),
    // prisma.module.ts에서 @Global 쓰긴 했지만
    // 1번은 import해야 provider 생성됨
    // → app.module.ts는 전역이므로 여기서 1회만 등록
    PrismaModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
