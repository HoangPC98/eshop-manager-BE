import { DeliveryStatus, PaymentStatus } from 'src/types/enum.type';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import CustomBaseEntity from './base_entity';
import { Cart } from './cart.entity';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity('orders')
export class Orders extends CustomBaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  product_id!: string;

  @Column()
  buyer_id!: string;

  @Column()
  voucher_id: string;

  @Column({nullable: true})
  quantity: number;

  @Column({type: 'float'})
  total_payment: number;

  @Column({nullable: true})
  delivery: string;

  @Column({nullable: true})
  payment: string;

  @Column({nullable: true, default: DeliveryStatus.InCart})
  delivery_status: DeliveryStatus;

  @Column({nullable: true, default: PaymentStatus.UnPaid})
  payment_status: PaymentStatus;

  @ManyToOne(()=>Product, (product)=>product.orders)
  @JoinColumn({name: 'product_id'})
  product: Product

  @ManyToOne(()=>User)
  @JoinColumn({name: 'buyer_id'})
  user: User

  @ManyToOne(()=>User)
  carts: Cart[]
}