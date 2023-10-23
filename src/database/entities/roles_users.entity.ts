import { AuthType, UserStatus, Gender } from 'src/types/enum.type';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import CustomBaseEntity from './base_entity';
import { User } from './user.entity';

@Entity('roles_users')
export class UserRole {
  @PrimaryColumn()
  user_id!: string;

  @PrimaryColumn()
  role_id!: string;

  @Column()
  status: UserStatus;
}