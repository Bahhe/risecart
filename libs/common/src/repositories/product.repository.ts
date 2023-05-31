import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ProductRepositoryInterface } from '../interfaces/product.repository.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

@Injectable()
export class ProductRepository
  extends BaseAbstractRepository<Product>
  implements ProductRepositoryInterface
{
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
    super(productRepository);
  }
}
