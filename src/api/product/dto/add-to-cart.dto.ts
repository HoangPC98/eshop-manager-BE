import { IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";

export class AddProductToCartDto {
  @IsNotEmpty()
  @IsString()
  product_id: string;

  @IsNotEmpty()
  @IsObject()
  options: object;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

}
