import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { OrderItem } from "./order_item.entity";

@Entity()
export class Order {

  @PrimaryGeneratedColumn('uuid')
  order_id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  orderDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ type: 'varchar', length: 20 })
  payment_method: string;

  @ManyToOne(() => User, (entity) => entity.order)
  @JoinColumn({ name: 'user' })
  user: User;

  @OneToMany(() => OrderItem, (entity) => entity.order, { cascade: true })
  orderItem: OrderItem[];

}