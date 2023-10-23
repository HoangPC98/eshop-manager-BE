import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) { }
  private log = new Logger(UserService.name);

  async getAllUser() {
    try {
      const userRecs = await this.userRepo.find()
      this.log.debug(userRecs)
      return userRecs;
    } catch (error) {
      this.log.error(error)
      throw new BadRequestException(error.detail)
    }
  }
}
