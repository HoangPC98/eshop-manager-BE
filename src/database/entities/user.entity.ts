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
import { UserProfile } from './user_profile.entity';

@Entity('users')
export class User extends CustomBaseEntity {
  @PrimaryColumn('uuid')
  public id!: string;

  @Column({ unique: true })
  uid!: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  username: string;

  @Column({ unique: true, select: false })
  secret: string;

  @Column({ nullable: true, default: AuthType.UsernamePasswordAuth })
  auth_type: AuthType;

  @Column({ nullable: true, default: UserStatus.Activated })
  status: UserStatus;

  @Column({ nullable: true, default: 'general_user' })
  role: string;

  @OneToMany((type) => Session, (session: Session) => session.user)
  sessions: Session[]
  
  @OneToOne(() => Shop, (shop)=>shop.owner_uid)
  @JoinColumn({name: 'id', referencedColumnName: 'owner_uid'})
  shop: Shop

  @OneToOne(()=>UserProfile, (profile)=>profile.uid)
  @JoinColumn({name: 'id'})
  profile: UserProfile

}