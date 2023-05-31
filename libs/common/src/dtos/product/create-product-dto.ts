import { IsArray, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  price: string;

  @IsString()
  salePrice: string;

  @IsString()
  quantity: string;

  @IsArray()
  images: string[];

  @IsArray()
  categories: string[];

  @IsString()
  brand: string;

  @IsArray()
  variations: string[];

  @IsArray()
  reviews: string[];

  @IsArray()
  averageRatings: string[];

  @IsArray()
  relatedProducts: string[];

  @IsString()
  featured: string;

  @IsString()
  active: string;
}
