import { Test, TestingModule } from '@nestjs/testing';
import { ProductCatalogController } from './product-catalog.controller';
import { ProductCatalogService } from './product-catalog.service';

describe('ProductCatalogController', () => {
  let productCatalogController: ProductCatalogController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductCatalogController],
      providers: [ProductCatalogService],
    }).compile();

    productCatalogController = app.get<ProductCatalogController>(ProductCatalogController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(productCatalogController.getHello()).toBe('Hello World!');
    });
  });
});
