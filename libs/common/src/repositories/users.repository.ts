import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { UsersRepositoryInterface } from '../interfaces/users.repository.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

@Injectable()
export class UsersRepository
  extends BaseAbstractRepository<User>
  implements UsersRepositoryInterface
{
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    super(usersRepository);
  }
}
