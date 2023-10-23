import { DeliveryStatus, PaymentStatus } from 'src/types/enum.type';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import CustomBaseEntity from './base_entity';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity('cart')
export class Cart extends CustomBaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  product_id!: string;

  @Column()
  user_id: string;

  @Column({nullable: true, default: 1 })
  quantity: number;

  @Column({nullable: true})
  options: string;

  @OneToOne(()=>Product)
  @JoinColumn({name: 'product_id'})
  product: Product
 
  @ManyToOne(()=>User)
  @JoinColumn({name: 'user_id'})
  user: User;
}