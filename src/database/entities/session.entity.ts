import { AuthType, UserStatus, Gender } from 'src/types/enum.type';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import CustomBaseEntity from './base_entity';
import { User } from './user.entity';

@Entity('session')
export class Session extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  // @ManyToOne(() => User, (user) => user.sessions)
  // @JoinColumn({ name: 'user_id' })
  // user: User;

  @Column({nullable: true})
  user_id: number;

  @Column({})
  email_or_phone: string;

  @Column({
    type: 'enum',
    enum: AuthType,
    nullable: false,
    default: AuthType.UsernamePasswordAuth
  })
  session_type: AuthType;

  @Column({nullable: true})
  flag: number;

  @Column({
    nullable: false,
    default: Date.now()
  })
  uuid: string;

  @Column({nullable: true})
  user_agent: string;

  @Column({ type: 'varchar', nullable: true })
  token: string;


  @ManyToOne(()=> User, (user: User) => user.sessions)
  user: User
}