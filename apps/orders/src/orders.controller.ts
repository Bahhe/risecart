import { CommonService, CreateOrderDto } from '@app/common';
import { Controller, Inject } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(
    @Inject('OrdersServiceInterface')
    private readonly ordersService: OrdersService,
    @Inject('CommonServiceInterface')
    private readonly commonService: CommonService,
  ) {}

  @MessagePattern({ cmd: 'create-order' })
  async create(
    @Ctx() context: RmqContext,
    @Payload()
    createOrderDto: CreateOrderDto,
  ) {
    this.commonService.acknowledgeMessage(context);
    return this.ordersService.createOrder(createOrderDto);
  }

  @MessagePattern({ cmd: 'get-all-orders' })
  async findAll(@Ctx() context: RmqContext) {
    this.commonService.acknowledgeMessage(context);
    return this.ordersService.findAll();
  }

  @MessagePattern({ cmd: 'get-order-by-id' })
  async findOne(@Ctx() context: RmqContext, @Payload() id: string) {
    this.commonService.acknowledgeMessage(context);
    return this.ordersService.findOneById(id);
  }

  @MessagePattern({ cmd: 'update-order' })
  async update(
    @Ctx() context: RmqContext,
    @Payload() data: { id: string; createOrderDto: CreateOrderDto },
  ) {
    this.commonService.acknowledgeMessage(context);
    return this.ordersService.update(data.id, data.createOrderDto);
  }

  @MessagePattern({ cmd: 'delete-order' })
  async remove(@Ctx() context: RmqContext, @Payload() id: string) {
    this.commonService.acknowledgeMessage(context);
    return this.ordersService.delete(id);
  }
}
