import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import CustomBaseEntity from './base_entity';
import { User } from './user.entity';

@Entity('sessions')
export class Role extends CustomBaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column({nullable: true})
  description: string;

  @Column({})
  level: number;

  @Column({ type: 'varchar', nullable: false })
  slug: string;
}