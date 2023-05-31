import {
  CreateProductDto,
  Product,
  ProductRepositoryInterface,
} from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class ProductCatalogService {
  constructor(
    @Inject('ProductRepositoryInterface')
    private productRepository: ProductRepositoryInterface,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    return await this.productRepository.save(createProductDto);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async findOneById(id: string): Promise<Product> {
    return await this.productRepository.findOneById(id);
  }

  async update(
    id: string,
    createProductDto: CreateProductDto,
  ): Promise<UpdateResult> {
    return this.productRepository.update(id, createProductDto);
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.productRepository.delete(id);
  }
}
