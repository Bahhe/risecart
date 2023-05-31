import {
  CommonModule,
  CommonService,
  PostgresStoreModule,
  Store,
  StoreRepository,
} from '@app/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';

@Module({
  imports: [
    PostgresStoreModule,
    CommonModule,
    TypeOrmModule.forFeature([Store]),
  ],
  controllers: [StoreController],
  providers: [
    {
      provide: 'StoreRepositoryInterface',
      useClass: StoreRepository,
    },
    {
      provide: 'StoreServiceInterface',
      useClass: StoreService,
    },
    {
      provide: 'CommonServiceInterface',
      useClass: CommonService,
    },
  ],
})
export class StoreModule {}
