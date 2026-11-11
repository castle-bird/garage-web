import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * `'jwt'` 전략(`jwt.strategy.ts`)을 실행하는 가드.
 * `@UseGuards(JwtAuthGuard)`를 붙인 곳에서 AT 검증 후 `req.user`를 세팅함.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
