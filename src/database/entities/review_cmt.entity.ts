import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

@Entity('review_cmt')
export class ReviewCmt extends CustomBaseEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column()
  resource_id: string;

  @Column()
  user_id: string;

  @Column()
  user_name: string;

  @Column()
  text: string;

  @Column()
  rating_score: number;

  @ManyToOne(()=> User)
  @JoinColumn({name: 'user_id'})
  user: User
}