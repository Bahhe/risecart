import {
  CommonModule,
  CommonService,
  Order,
  OrdersRepository,
  PostgresOrdersModule,
} from '@app/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    PostgresOrdersModule,
    CommonModule,
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [OrdersController],
  providers: [
    { provide: 'OrdersRepositoryInterface', useClass: OrdersRepository },
    { provide: 'OrdersServiceInterface', useClass: OrdersService },
    { provide: 'CommonServiceInterface', useClass: CommonService },
  ],
})
export class OrdersModule {}
