import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types/jwt-payload.type.js';

/**
 * Access Token(JWT) 인증 전략(Strategy).
 *
 * - 전략: Passport에서 "인증 방식 1개"를 뜻하는 단위 (jwt, local, google 등).
 * - `PassportStrategy(Strategy)`: passport-jwt의 Strategy를 Nest 방식(DI 사용 가능)으로 감싸는 어댑터.
 *   → 이 클래스가 Passport에 `'jwt'` 이름의 전략으로 등록됨.
 * - 실행은 `JwtAuthGuard`(`AuthGuard('jwt')`)가 `'jwt'` 이름으로 이 전략을 찾아 호출함.
 *
 * 흐름: Guard → 토큰 추출 → 서명·만료 검증 → validate() → req.user
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      // Authorization 헤더의 "Bearer <토큰>"에서 토큰만 추출
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 서명 검증용 비밀키 (AT 발급 시 사용한 키와 동일해야 함)
      secretOrKey: config.getOrThrow<string>('JWT_ACCESS_SECRET'),
      // 만료된 토큰 거부 (기본값이 false이나 의도를 명시)
      ignoreExpiration: false,
    });
  }

  /**
   * 서명·만료 검증을 통과한 뒤 passport가 호출하는 훅 (메서드명 `validate` 고정).
   * 반환값이 `req.user`가 되며, null/false 반환 시 401 처리됨.
   */
  validate(payload: JwtPayload) {
    return payload;
  }
}
