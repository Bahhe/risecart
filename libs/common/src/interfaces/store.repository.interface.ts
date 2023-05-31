import { Store } from '../entities/store.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export interface StoreRepositoryInterface
  extends BaseInterfaceRepository<Store> {}
