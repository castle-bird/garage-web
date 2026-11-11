import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import { SignupRequest } from '@garage/shared';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // 이메일로 활성 회원 1명 조회 (없으면 null)
  findActiveUserByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: { email, deletedAt: new Date(0) },
    });
  }

  // 회원 생성
  async createUser(data: SignupRequest) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
  }
}
