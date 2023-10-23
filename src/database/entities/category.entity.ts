import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import CustomBaseEntity from './base_entity';
import { User } from './user.entity';

@Entity('category')
export class Category {
  @PrimaryColumn('uuid')
  public id!: string;

  @Column()
  category_industry_id: string

  @Column()
  name!: string;

  @Column({nullable: true})
  description: string;

  @Column({ type: 'varchar', nullable: false })
  slug: string;
}