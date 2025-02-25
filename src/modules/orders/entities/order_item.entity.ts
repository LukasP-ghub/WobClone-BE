import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ebook } from "../../ebooks/entities/ebook.entity";
import { Order } from "./order.entity";

@Entity()
export class OrderItem {

  @PrimaryGeneratedColumn('uuid')
  item_id: string;

  @ManyToOne(() => Order, order => order.orderItem)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Ebook, ebook => ebook.orderItem, { cascade: true })
  @JoinColumn({ name: 'ebook_id' })
  ebook: Ebook;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;
}