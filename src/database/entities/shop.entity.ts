import { CurrencyUnit } from 'src/types/enum.type';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import CustomBaseEntity from './base_entity';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity('shop')
export class Shop extends CustomBaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({})
  owner_uid: string; 

  @Column()
  category_industry: string; 

  @Column()
  name!: string;

  @Column({type: 'enum', enum: CurrencyUnit})
  currency_unit!: CurrencyUnit;

  @Column({default: 0})
  like_number!: number;

  @Column({default: 0})
  visits_number!: number;

  @Column({nullable: true, type: 'float' })
  rating_score: string;

  @Column({})
  logo_img: string;

  @OneToMany((type)=> Product, (product) => product.shop)
  products: Product[]

  @OneToOne(()=> User)
  @JoinColumn({name: 'owner_uid'})
  user: User;
} 