import { CommonService, CreateStoreDto } from '@app/common';
import { Controller, Inject } from '@nestjs/common';
import {
  MessagePattern,
  Ctx,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { StoreService } from './store.service';

@Controller()
export class StoreController {
  constructor(
    @Inject('StoreServiceInterface')
    private readonly storeService: StoreService,
    @Inject('CommonServiceInterface')
    private readonly commonService: CommonService,
  ) {}

  @MessagePattern({ cmd: 'create-store' })
  async create(
    @Ctx() context: RmqContext,
    @Payload()
    createStoreDto: CreateStoreDto,
  ) {
    this.commonService.acknowledgeMessage(context);
    return this.storeService.createStore(createStoreDto);
  }

  @MessagePattern({ cmd: 'get-all-stores' })
  async findAll(@Ctx() context: RmqContext) {
    this.commonService.acknowledgeMessage(context);
    return this.storeService.findAll();
  }

  @MessagePattern({ cmd: 'get-store-by-id' })
  async findOne(@Ctx() context: RmqContext, @Payload() id: string) {
    this.commonService.acknowledgeMessage(context);
    return this.storeService.findOneById(id);
  }

  @MessagePattern({ cmd: 'update-store' })
  async update(
    @Ctx() context: RmqContext,
    @Payload() data: { id: string; createStoreDto: CreateStoreDto },
  ) {
    this.commonService.acknowledgeMessage(context);
    return this.storeService.update(data.id, data.createStoreDto);
  }

  @MessagePattern({ cmd: 'delete-store' })
  async remove(@Ctx() context: RmqContext, @Payload() id: string) {
    this.commonService.acknowledgeMessage(context);
    return this.storeService.delete(id);
  }
}
