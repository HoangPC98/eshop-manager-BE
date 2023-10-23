import { ProductCondition } from 'src/types/enum.type';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import CustomBaseEntity from './base_entity';
import { Orders } from './order.entity';
import { Shop } from './shop.entity';
import { User } from './user.entity';

@Entity('product')
export class Product  extends CustomBaseEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column()
  shop_id!: string;

  @Column({unique: true})
  slug!: string;

  @Column()
  category_id: string;

  @Column()
  name!: string;

  @Column()
  descs: string;

  @Column()
  avatar_image: string;

  @Column("text", {array: true})
  list_image: string[];

  @Column({type: 'enum', enum: ProductCondition})
  condition: string;

  @Column()
  import_price: number;

  @Column()
  origin_price: number;

  @Column({nullable: true, type: 'float'})
  rating_score: number;

  @Column()
  discount: string;

  @Column()
  promotion: string;

  @Column()
  specs_n_detail: string;

  @Column({nullable: true})
  inventory_number: string;

  @Column({nullable: true})
  sold_number: string;

  @Column({nullable: true})
  options: string;
  
  @ManyToOne(()=> Shop, shop=> shop.products)
  @JoinColumn({name: 'shop_id'})
  shop: Shop;

  @OneToMany(()=>Orders, (order)=>order.product)
  orders: Orders[]
}