import {
  CommonModule,
  CommonService,
  PostgresProductCatalogModule,
  Product,
  ProductRepository,
} from '@app/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCatalogController } from './product-catalog.controller';
import { ProductCatalogService } from './product-catalog.service';

@Module({
  imports: [
    PostgresProductCatalogModule,
    TypeOrmModule.forFeature([Product]),
    CommonModule,
  ],
  controllers: [ProductCatalogController],
  providers: [
    {
      provide: 'ProductServiceInterface',
      useClass: ProductCatalogService,
    },
    {
      provide: 'ProductRepositoryInterface',
      useClass: ProductRepository,
    },
    {
      provide: 'CommonServiceInterface',
      useClass: CommonService,
    },
  ],
})
export class ProductCatalogModule {}
