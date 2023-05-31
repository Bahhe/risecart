import { User } from '../entities/users.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export interface UsersRepositoryInterface
  extends BaseInterfaceRepository<User> {}
