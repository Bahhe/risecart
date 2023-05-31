import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../entities/store.entity';
import { StoreRepositoryInterface } from '../interfaces/store.repository.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

@Injectable()
export class StoreRepository
  extends BaseAbstractRepository<Store>
  implements StoreRepositoryInterface
{
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {
    super(storeRepository);
  }
}
