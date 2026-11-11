import { Injectable, ConflictException, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { SignupDto } from './dto/signup.dto.js';
import { Prisma } from '../generated/prisma/client.js';
import { toUserResponse } from '../users/mapper/users.mapper.js';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly userService: UsersService) {}

  /**
   * 회원가입.
   * 사전 조회 없이 바로 INSERT하고, DB Unique 제약 위반을 409로 변환함.
   * → 조회 후 저장 방식의 Race Condition을 DB가 막아줌.
   * → Spring Data JPA의 saveAndFlush와 유사 (Prisma는 항상 즉시 INSERT).
   *
   * - PrismaClientKnownRequestError: Prisma가 에러 코드를 정의해둔 DB 에러.
   * - P2002: Unique constraint failed (이메일 또는 닉네임 중복).
   */
  async signup(dto: SignupDto) {
    try {
      const user = await this.userService.createUser(dto);

      return toUserResponse(user);
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        const field = getDuplicatedField(e);

        if (field === 'email') {
          this.logger.warn('회원가입 실패: 이메일 중복');
          throw new ConflictException('이미 사용 중인 이메일입니다.');
        }

        if (field === 'nickname') {
          this.logger.warn('회원가입 실패: 닉네임 중복');
          throw new ConflictException('이미 사용 중인 닉네임입니다.');
        }

        this.logger.error(
          '회원가입 실패: 중복 필드 판별 불가 (P2002, 제약 이름 확인 필요)',
          e.meta ?? e,
        );
        throw new ConflictException('이미 사용 중인 이메일 또는 닉네임입니다.');
      } // if

      throw e;
    }
  }
}

/**
 * P2002(Unique constraint failed) 에러에서 중복된 필드를 판별함.
 *
 * - Prisma가 `meta`를 `Record<string, unknown>`으로만 제공해 타입이 없음.
 *   → 실제 에러를 console.dir()로 확인한 구조(`driverAdapterError.cause.constraint.index`)를
 *     직접 타입으로 선언해 접근함.
 * - `index`는 PostgreSQL 제약 이름 (예: `users_nickname_deletedAt_key`).
 * - Prisma 7 + driver adapter(adapter-pg) 기준.
 *
 * @returns 중복된 필드명, 판별 불가 시 null
 */
function getDuplicatedField(
  e: Prisma.PrismaClientKnownRequestError,
): 'email' | 'nickname' | null {
  const index =
    (
      e.meta?.driverAdapterError as {
        cause?: { constraint?: { index?: string } };
      }
    )?.cause?.constraint?.index ?? '';

  if (index.includes('email')) return 'email';
  if (index.includes('nickname')) return 'nickname';

  return null;
}
