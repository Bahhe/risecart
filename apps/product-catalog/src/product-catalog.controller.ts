import { CommonService, CreateProductDto } from '@app/common';
import { Controller, Inject } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { ProductCatalogService } from './product-catalog.service';

@Controller()
export class ProductCatalogController {
  constructor(
    @Inject('ProductServiceInterface')
    private readonly productCatalogService: ProductCatalogService,
    @Inject('CommonServiceInterface')
    private readonly commonService: CommonService,
  ) {}

  @MessagePattern({ cmd: 'create-product' })
  async create(
    @Ctx() context: RmqContext,
    @Payload()
    createProductDto: CreateProductDto,
  ) {
    this.commonService.acknowledgeMessage(context);
    return this.productCatalogService.createProduct(createProductDto);
  }

  @MessagePattern({ cmd: 'get-all-products' })
  async findAll(@Ctx() context: RmqContext) {
    this.commonService.acknowledgeMessage(context);
    return this.productCatalogService.findAll();
  }

  @MessagePattern({ cmd: 'get-product-by-id' })
  async findOne(@Ctx() context: RmqContext, @Payload() id: string) {
    this.commonService.acknowledgeMessage(context);
    return this.productCatalogService.findOneById(id);
  }

  @MessagePattern({ cmd: 'update-product' })
  async update(
    @Ctx() context: RmqContext,
    @Payload() data: { id: string; createProductDto: CreateProductDto },
  ) {
    this.commonService.acknowledgeMessage(context);
    return this.productCatalogService.update(data.id, data.createProductDto);
  }

  @MessagePattern({ cmd: 'delete-product' })
  async remove(@Ctx() context: RmqContext, @Payload() id: string) {
    this.commonService.acknowledgeMessage(context);
    return this.productCatalogService.delete(id);
  }
}
