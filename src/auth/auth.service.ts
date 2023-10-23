import { BadRequestException, HttpException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { SALT_ROUND } from 'src/constants/common.contant';
import { User } from 'src/database/entities/user.entity';
import { idGenerator, secretGenerator } from 'src/modules/stringGenerator';
import { LoginUsrPswDto } from './dto/login-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { sendSms } from 'src/services/sms.service';
import { MailService } from 'src/services/mailer/mailer.service';
import {
  LoginTicket,
  OAuth2Client as GoogleOAuth2Client,
} from 'google-auth-library';
import { ProfileT, UserProfileT, UserT } from 'src/types/data.type';
import { AuthType, BaseRoles, UserStatus } from 'src/types/enum.type';
// import { UserRole } from 'src/database/entities/roles_users.entity';
import { UserService } from 'src/api/user/user.service'
import { AppRepository } from 'src/database/app-repository';
import { Role } from 'src/database/entities/role.entity';
import { UserProfile } from 'src/database/entities/user_profile.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly repository: AppRepository,
    private readonly jwt: JwtService,
    private readonly mailer: MailService,
    private readonly userService: UserService,
  ) {
    const ggClientId = process.env.GG_OAUTH_CLIENT_ID;
    const ggClientSecret = process.env.GG_OAUTH_CLIENT_SCERET;
    this.ggOAuth = new GoogleOAuth2Client(ggClientId, ggClientSecret)
  }
  private log = new Logger(AuthService.name);
  private readonly ggOAuth: GoogleOAuth2Client;

  private getUserTokenPayload = (userRec: UserProfileT) => {
    this.log.debug(userRec)
    const accessTokenPayload = {
      userId: userRec.id,
      userEmail: userRec.profile.email,
    }
    const userPayload = {
      ...accessTokenPayload,
      userAvatar: userRec.profile.avatar,
      userRole: userRec.role,
      // role_level: userRec.role_level,
      userName: userRec.username,
      userStatus: userRec.status,
    };
    if(userRec.own_shop)
      userPayload['ownShop'] = userRec.own_shop
      
    const accessToken = this.jwt.sign(
      userPayload,
      { expiresIn: '1d', secret: process.env.JWT_ATOKEN_SECRET }
    );
    const refreshToken = this.jwt.sign(
      accessTokenPayload,
      {
        expiresIn: process.env.TTL_RTOKEN || '3d',
        secret: process.env.JWT_RTOKEN_SECRET,
      }
    );
    return { accessToken, refreshToken, userPayload };
  };

  async loginUnP(loginBody: LoginUsrPswDto) {
    const thisUser = await this.userRepo.findOne({
      where: { uid: loginBody.uid },
      relations: { profile: true }
    })

    if (!thisUser)
      throw new BadRequestException('Not found your email or phone number')

    let checkPsw = bcrypt.compareSync(loginBody.password, thisUser.password)
    if (checkPsw == false)
      throw new BadRequestException('Wrong password')
    let userTk = {
      ...thisUser,
      own_shop: thisUser.shop ? thisUser.shop.id : null
    }
    delete userTk.shop
    const userTokenPayload = this.getUserTokenPayload(userTk)
    return userTokenPayload;
  }

  async googleAuth(ggToken: string) {
    let ggLoginToken: LoginTicket;

    try {
      ggLoginToken = await this.ggOAuth.verifyIdToken({
        idToken: ggToken,
        audience: this.ggOAuth._clientId,
      });
    } catch (error) {
      this.log.error(`Google verify token on google failure: ${error}`);
      throw new UnauthorizedException(`Google verify token on failure`);
    }

    const { sub, email_verified, email, name, picture } = ggLoginToken.getPayload();
    if (!email_verified)
      throw new UnauthorizedException('Your email is not verified')

    let userExisted: User;
    userExisted = await this.userRepo.findOne({
      where: { uid: email },
      relations: {
        profile: true,
      }
    });
    const ownShop = await this.repository.shop.findOneBy({owner_uid: userExisted.id})
    if (userExisted) {
      if(ownShop) userExisted['own_shop'] = ownShop.id;
      return this.getUserTokenPayload(userExisted)
    }
    else {
      const newUserObj: UserT = {
        id: sub,
        uid: email,
        username: name,
        password: null,
        auth_type: AuthType.GoogleOAuth,
        role: BaseRoles.Vendor,
        secret: secretGenerator(),
        status: UserStatus.Activated
      }
      const newProfileObj: ProfileT = {
        uid: sub,
        fullname: name,
        dob: null,
        email: email,
        phone_number: null,
        avatar: picture,
        gender: null
      }

      await this.repository.dataSource.transaction(async (manager) => {
        await manager.getRepository(User).save(newUserObj);
        await manager.getRepository(UserProfile).save(newProfileObj)
      })
      let newUserTk: UserProfileT = {
        ...newUserObj,
        profile: newProfileObj
      }
      const userTokenPayload = this.getUserTokenPayload(newUserTk)
      return userTokenPayload;
    }

  }

  async signUp(body: SignUpAuthDto) {
    const hashPsw = await bcrypt.hash(body.password, SALT_ROUND)
    try {
      this.log.debug(body)
      const newUserObj: UserT = {
        uid: body.phone_number || body.email,
        username: body.fullname,
        role: body.acc_type || BaseRoles.UserGeneral,
        password: null,
        auth_type: AuthType.GoogleOAuth,
        secret: secretGenerator(),
        status: UserStatus.Unactivated
      }

      await this.repository.dataSource.transaction(async (manager) => {
        let newUser = await manager.save(newUserObj);
        const newProfileObj: ProfileT = {
          uid: newUser.id,
          fullname: body.fullname,
          dob: null,
          email: body.email,
          phone_number: null,
          avatar: null,
          gender: null
        }
        await manager.save(newProfileObj)

      })
    } catch (error) {
      this.log.error(error)
      throw new BadRequestException(error.detail)
    }
  }

  async getRefreshToken(token: string) {
    try {
      let tokenPayload = this.jwt.verify(token, {
        secret: process.env.JWT_RTOKEN_SECRET
      })
      console.log('to;ken payload...', tokenPayload)
      const thisUser: User = await this.userRepo.findOne({
        where: { id: tokenPayload.userId },
        relations: {
          profile: true
        }
      })
      return this.getUserTokenPayload(thisUser)
    } catch (error) {
      console.log(error)
      throw new HttpException('Forbidden..', 401);
    }
  }
}
