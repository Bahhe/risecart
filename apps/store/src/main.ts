import { CommonService } from '@app/common';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { StoreModule } from './store.module';

async function bootstrap() {
  const app = await NestFactory.create(StoreModule);
  const configService = app.get(ConfigService);
  const commonService = app.get(CommonService);
  const queue = configService.get('RABBITMQ_STORE_QUEUE');

  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice(commonService.getRmqOptions(queue, false));
  await app.startAllMicroservices();
  await app.listen(5002, '0.0.0.0');
  Logger.log(`Store microservice is running on: ${await app.getUrl()}`);
  Logger.log('Store microservice is running');
}
bootstrap();
