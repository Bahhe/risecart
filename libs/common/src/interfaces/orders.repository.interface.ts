import { Order } from '../entities/order.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export interface OrdersRepositoryInterface
  extends BaseInterfaceRepository<Order> {}
