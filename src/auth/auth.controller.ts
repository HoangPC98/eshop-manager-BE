import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { TokenAuthDto, LoginUsrPswDto } from './dto/login-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login-usrpsw')
  loginUnP(@Body() loginUsrPswDto: LoginUsrPswDto) {
    console.log('alkdfj', loginUsrPswDto)
    return this.authService.loginUnP(loginUsrPswDto);
  }

  @Post('/login-by-google')
  loginByGoogle(@Body() ggAuthBody: TokenAuthDto) {
    return this.authService.googleAuth(ggAuthBody.token);
  }

  @Post('/sign-up')
  signUp(@Body() signUpDto: SignUpAuthDto) {
    console.log('DTO', signUpDto)
    return this.authService.signUp(signUpDto);
  }

  @Post('/refresh-token')
  getRefreshToken(@Body() refreshTokenObj: TokenAuthDto) {
    return this.authService.getRefreshToken(refreshTokenObj.token)
  }
}
