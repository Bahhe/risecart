import { CreateStoreDto, Store, StoreRepositoryInterface } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class StoreService {
  constructor(
    @Inject('StoreRepositoryInterface')
    private storeRepository: StoreRepositoryInterface,
  ) {}

  async createStore(createStoreDto: CreateStoreDto): Promise<Store> {
    return await this.storeRepository.save(createStoreDto);
  }

  async findAll(): Promise<Store[]> {
    return await this.storeRepository.findAll();
  }

  async findOneById(id: string): Promise<Store> {
    return await this.storeRepository.findOneById(id);
  }

  async update(
    id: string,
    createStoreDto: CreateStoreDto,
  ): Promise<UpdateResult> {
    return this.storeRepository.update(id, createStoreDto);
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.storeRepository.delete(id);
  }
}
