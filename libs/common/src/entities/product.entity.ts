import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  salePrice: string;

  @Column()
  quantity: string;

  @Column('text', { array: true })
  images: string[];

  @Column('text', { array: true })
  categories: string[];

  @Column()
  brand: string;

  @Column('text', { array: true })
  variations: string[];

  @Column('text', { array: true })
  reviews: string[];

  @Column('text', { array: true })
  averageRatings: string[];

  @Column('text', { array: true })
  relatedProducts: string[];

  @Column()
  featured: string;

  @Column()
  active: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
