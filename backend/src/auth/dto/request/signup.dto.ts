import { SignupRequest } from '@garage/shared';
import {
  IsEmail,
  IsString,
  MaxLength,
  Length,
  Matches,
} from 'class-validator';

export class SignupDto implements SignupRequest {
  @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다.' })
  @MaxLength(255, { message: '이메일은 255글자 이하만 가능합니다.' })
  email: string;

  @IsString({ message: '비밀번호는 문자열이어야 합니다.' })
  @Length(8, 72, {
    message: '비밀번호는 8글자 이상 72글자 이하만 가능합니다.',
  })
  @Matches(/^[\x21-\x7E]+$/, {
    message: '비밀번호는 영문, 숫자, 특수문자만 사용할 수 있습니다.',
  })
  password: string;

  @IsString({ message: '닉네임은 문자열이어야 합니다.' })
  @Length(2, 30, { message: '닉네임은 2글자 이상 30글자 이하만 가능합니다.' })
  nickname: string;
}
