import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/database/entities/roles_users.entity';
import { User } from 'src/database/entities/user.entity';
import { ProfileT, UserT } from 'src/types/data.type';
import { BaseRoles, UserStatus } from 'src/types/enum.type';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { getConnection } from 'typeorm';
import { UserProfile } from 'src/database/entities/user_profile.entity';
import { idGenerator, secretGenerator } from 'src/modules/stringGenerator';
import { DEFAULT_AVATAR_URL } from 'src/constants/common.contant';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) { }

  async createNewUser(userPayload: any): Promise<User> {
    console.log('USER PAYLOAD', userPayload)
    let newUser: User = new User();
    Object.assign(newUser, {
      id: userPayload.id || idGenerator(8),
      uid: userPayload.uid,
      password: userPayload.password,
      username: userPayload.username,
      auth_type: userPayload.auth_type,
      role: userPayload.role,
      status: UserStatus.Unactivated,
      secret: secretGenerator(),
    })
    try {

      await getConnection().transaction(async transEntity => {
        newUser = await transEntity.save(newUser);
        console.log('nerw User...', newUser)
        let newProfile: ProfileT = new UserProfile()
        newProfile.uid = newUser.id;
        newProfile.fullname = newUser.username;
        newProfile.email = userPayload.email || null;
        newProfile.phone_number = userPayload.phone_number || null;
        newProfile.avatar = DEFAULT_AVATAR_URL;
        newProfile.dob = userPayload.dob || null;
        newProfile.gender = userPayload.gender || null;
        newProfile.address = userPayload.address || null;

        // Object.assign(newProfile, {
        //   uid: newUser.id,
        //   fullname: 
        //   email: userPayload.email || null,
        //   phone_number: userPayload.phone_number || null,
        //   avatar: DEFAULT_AVATAR_URL,
        //   dob: userPayload.dob || null,
        //   gender: userPayload.gender || null,
        //   address: userPayload.address || null,
        // })
        await transEntity.save(newProfile)

        // const newRole = await transEntity.save(newUserRole);
        // console.log('user_role...', newRole)
      });
    } catch (error) {
      console.log("ERROR... ", error)
      throw new BadRequestException()
    } finally {
      return newUser;
    }
  }

  async getAllAccount(): Promise<UserT[] | User[]> {
    const userRecs: Array<User> = await this.userRepo.find({})
    return userRecs
  }
}
