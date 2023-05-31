import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  activityType: string;

  @Column()
  currency: string;

  @Column()
  storeName: string;

  @Column()
  domainName: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  address: string;

  @Column()
  secondAddress: string;

  @Column()
  country: string;

  @Column()
  province: string;

  @Column()
  village: string;

  @Column()
  phoneNumber: string;

  @Column()
  website: string;

  @Column()
  email: string;

  @Column()
  isRegistred: boolean;
}
