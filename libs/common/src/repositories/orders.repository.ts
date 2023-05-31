import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrdersRepositoryInterface } from '../interfaces/orders.repository.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

@Injectable()
export class OrdersRepository
  extends BaseAbstractRepository<Order>
  implements OrdersRepositoryInterface
{
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {
    super(ordersRepository);
  }
}
