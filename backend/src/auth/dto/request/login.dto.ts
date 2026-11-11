import { LoginRequest } from '@garage/shared';
import {
  IsEmail,
  IsString,
  MaxLength,
  Length,
  IsNotEmpty,
} from 'class-validator';

export class LoginDto implements LoginRequest {
  @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다.' })
  @MaxLength(255, { message: '이메일은 255글자 이하만 가능합니다.' })
  email: string;

  @IsString({ message: '비밀번호는 문자열이어야 합니다.' })
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  @MaxLength(72, { message: '비밀번호가 허용된 글자수를 초과했습니다.' })
  password: string;
}
