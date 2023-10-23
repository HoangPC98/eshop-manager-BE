import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  category_id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  import_price: number;

  @IsNotEmpty()
  @IsString()
  origin_price: number;

  @IsNotEmpty()
  @IsString()
  inventory_number: number;

  @IsNotEmpty()
  @IsString()
  desc: string;

  @IsNotEmpty()
  @IsString()
  spec_n_detail: string;
}
