import { CreateOrderDto, Order, OrdersRepositoryInterface } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('OrdersRepositoryInterface')
    private orderRepository: OrdersRepositoryInterface,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    return await this.orderRepository.save(createOrderDto);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.findAll();
  }

  async findOneById(id: string): Promise<Order> {
    return await this.orderRepository.findOneById(id);
  }

  async update(
    id: string,
    createOrderDto: CreateOrderDto,
  ): Promise<UpdateResult> {
    return this.orderRepository.update(id, createOrderDto);
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.orderRepository.delete(id);
  }
}
