import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginUsrPswDto {
  @IsNotEmpty()
  @IsString()
  uid: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class TokenAuthDto {
  @IsNotEmpty()
  @IsString()
  token: string;
}


