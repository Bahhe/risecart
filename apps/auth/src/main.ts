import { CommonService } from '@app/common';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);
  const commonService = app.get(CommonService);
  const queue = configService.get('RABBITMQ_AUTH_QUEUE');

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.connectMicroservice(commonService.getRmqOptions(queue, false));
  await app.startAllMicroservices();
  await app.listen(5001, '0.0.0.0');
  Logger.log(`Auth is running on: ${await app.getUrl()}`);
  Logger.log(`Auth microservice is running`);
}
bootstrap();
