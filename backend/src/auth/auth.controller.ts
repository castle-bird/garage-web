import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto.js';
import { AuthService } from './auth.service.js';
import { UserResponse } from '@garage/shared';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto): Promise<UserResponse> {
    return this.authService.signup(dto);
  }
}
