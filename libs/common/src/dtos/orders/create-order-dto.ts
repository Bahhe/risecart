import { IsArray, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  shopId: string;

  @IsString()
  customerId: string;

  @IsString()
  orderDate: string;

  @IsArray()
  orderItems: string[];

  @IsString()
  billingAddress: string;

  @IsString()
  shippingAddress: string;

  @IsString()
  paymentInformation: string;

  @IsString()
  orderStatus: string;

  @IsString()
  totalAmount: string;

  @IsString()
  shippingMethod: string;

  @IsString()
  orderNotes: string;

  @IsString()
  orderHistory: string;
}
