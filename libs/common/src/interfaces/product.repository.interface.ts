import { Product } from '../entities/product.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export interface ProductRepositoryInterface
  extends BaseInterfaceRepository<Product> {}
