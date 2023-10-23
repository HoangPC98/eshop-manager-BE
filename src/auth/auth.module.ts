import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/services/mailer/mailer.module';
import { UserService } from 'src/api/user/user.service';
import { UserModule } from 'src/api/user/user.module';
import { DatabaseModule } from 'src/database/database.module';
import { AppRepository } from 'src/database/app-repository';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AppRepository, JwtModule, MailModule ],
  controllers: [AuthController],
  providers: [AuthService, UserService, AppRepository]
})
export class AuthModule {}
