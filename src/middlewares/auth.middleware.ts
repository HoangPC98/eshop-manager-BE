import { HttpException, HttpStatus, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwt: JwtService
  ) { }
  use(req: Request, res: Response, next: NextFunction) {
    try {
      let token = req.headers.authorization;
      token = token.split(' ')[1]
      if (!token)
        throw new UnauthorizedException('no access_token')
      console.log('header...', token)

      let tokenPayload = this.jwt.verify(token, {
        secret: process.env.JWT_ATOKEN_SECRET
      })
      console.log('token payload', tokenPayload)
      req['user'] = {
        ...tokenPayload
      }
    } catch (error) {
      console.log(error)
      throw new HttpException('UnAuthorized Token', 401);
    }
    next();
  }
}
