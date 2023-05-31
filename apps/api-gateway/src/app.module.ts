import { CommonModule } from '@app/common';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    CommonModule.registerMq('STORE_SERVICE', process.env.RABBITMQ_STORE_QUEUE),
    CommonModule.registerMq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    CommonModule.registerMq(
      'ORDERS_SERVICE',
      process.env.RABBITMQ_ORDERS_QUEUE,
    ),
    CommonModule.registerMq(
      'PRODUCT_CATALOG_SERVICE',
      process.env.RABBITMQ_PRODUCT_CATALOG_QUEUE,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
