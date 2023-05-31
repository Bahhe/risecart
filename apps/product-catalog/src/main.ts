import { CommonService } from '@app/common';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ProductCatalogModule } from './product-catalog.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductCatalogModule);
  const configService = app.get(ConfigService);
  const commonService = app.get(CommonService);
  const queue = configService.get('RABBITMQ_PRODUCT_CATALOG_QUEUE');

  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice(commonService.getRmqOptions(queue, false));
  await app.startAllMicroservices();
  Logger.log('Product-catalog microservice is running');
}
bootstrap();
