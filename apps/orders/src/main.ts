import { CommonService } from '@app/common';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  const configService = app.get(ConfigService);
  const commonService = app.get(CommonService);
  const queue = configService.get('RABBITMQ_ORDERS_QUEUE');

  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice(commonService.getRmqOptions(queue, false));
  await app.startAllMicroservices();
  Logger.log('Orders microservice is running');
}
bootstrap();
