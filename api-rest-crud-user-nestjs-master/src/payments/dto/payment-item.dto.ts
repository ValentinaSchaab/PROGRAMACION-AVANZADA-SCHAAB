import { IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class PaymentItemDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @Min(1)
  quantity: number;
}