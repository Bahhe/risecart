import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateStoreDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
