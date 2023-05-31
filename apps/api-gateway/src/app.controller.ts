import {
  AuthGuard,
  CreateOrderDto,
  CreateProductDto,
  CreateStoreDto,
  CreateUserDto,
} from '@app/common';
import { UserLoginDto } from '@app/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('STORE_SERVICE') private readonly storeService: ClientProxy,
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    @Inject('PRODUCT_CATALOG_SERVICE')
    private readonly productCatalogService: ClientProxy,
    @Inject('ORDERS_SERVICE') private readonly ordersService: ClientProxy,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/stores')
  async getStores() {
    return this.storeService
      .send(
        {
          cmd: 'get-all-stores',
        },
        {},
      )
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }
  @Get('/store/:id')
  async getStoreById(@Param('id') id: string) {
    return this.storeService.send(
      {
        cmd: 'get-store-by-id',
      },
      id,
    );
  }

  @Post('/store')
  async createStore(@Body() createStoreDto: CreateStoreDto) {
    return this.storeService.send(
      {
        cmd: 'create-store',
      },
      createStoreDto,
    );
  }

  @Put('/store/:id')
  async updateStore(
    @Body() createStoreDto: CreateStoreDto,
    @Param('id') id: string,
  ) {
    return this.storeService.send(
      {
        cmd: 'update-store',
      },
      { id, createStoreDto },
    );
  }

  @Delete('/store/:id')
  async deleteStore(@Param('id') id: string) {
    return this.storeService.send(
      {
        cmd: 'delete-store',
      },
      { id },
    );
  }

  @Post('auth/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService
      .send(
        {
          cmd: 'register-user',
        },
        createUserDto,
      )
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  @Post('auth/login')
  async login(@Body() userLoginDto: UserLoginDto) {
    return this.authService
      .send({ cmd: 'user-login' }, userLoginDto)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  @Get('/orders')
  async getOrders() {
    return this.ordersService
      .send(
        {
          cmd: 'get-all-orders',
        },
        {},
      )
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  @Get('/products')
  async getProducts() {
    return this.productCatalogService
      .send(
        {
          cmd: 'get-all-products',
        },
        {},
      )
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  @Post('/orders')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.send(
      {
        cmd: 'create-order',
      },
      createOrderDto,
    );
  }

  @Post('/products')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productCatalogService.send(
      {
        cmd: 'create-product',
      },
      createProductDto,
    );
  }

  @Post('/double')
  async createDouble(
    @Body() createProductDto: CreateProductDto,
    @Body() createStoreDto: CreateStoreDto,
  ) {
    this.productCatalogService.send({ cmd: 'create-double' }, createProductDto);
    this.storeService.send({ cmd: 'create-double' }, createStoreDto);
  }
}
