import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseRoles, Gender } from 'src/types/enum.type';

export class SignUpAuthDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  fullname: string;

  @IsString()
  acc_type: BaseRoles;
}
