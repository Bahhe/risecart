import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  shopId: string;

  @Column()
  customerId: string;

  @CreateDateColumn()
  orderDate: string;

  @Column('text', { array: true })
  orderItems: string[];

  @Column()
  billingAddress: string;

  @Column()
  shippingAddress: string;

  @Column()
  paymentInformation: string;

  @Column()
  orderStatus: string;

  @Column()
  totalAmount: string;

  @Column()
  shippingMethod: string;

  @Column()
  orderNotes: string;

  @Column()
  orderHistory: string;
}
