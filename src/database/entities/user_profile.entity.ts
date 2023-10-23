import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import CustomBaseEntity from './base_entity';
// import { NotificationReceive } from './notification-receive';
import { DEFAULT_AVATAR_URL } from 'src/constants/common.contant';
import { AuthType, UserStatus, Gender } from 'src/types/enum.type';
import { Session } from './session.entity';
import { Shop } from './shop.entity';
import { User } from './user.entity';

@Entity('user_profile')
export class UserProfile extends CustomBaseEntity {
  @PrimaryColumn('uuid')
  uid!: string;

  @Column()
  fullname: string;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ unique: true, nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  dob: Date;

  @Column({ nullable: true, default: DEFAULT_AVATAR_URL })
  avatar: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'uid'  })
  user: User;
}