import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export default abstract class CustomBaseEntity extends BaseEntity {
  @CreateDateColumn({
    nullable: false,
    precision: 6,
  })
  created_at: Date = new Date();

  @UpdateDateColumn({
    nullable: true,
    default: null,
    precision: 6,
  })
  updated_at?: Date;

  @DeleteDateColumn({
    nullable: true,
    default: null
  })
  deleted_at?: Date;
}