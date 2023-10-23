import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateProductManagerDto {
  @IsNotEmpty()
  @IsString()
  category_id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  import_price: number;

  @IsNotEmpty()
  @IsNumber()
  origin_price: number;

  @IsNotEmpty()
  @IsNumber()
  inventory_number: number;

  @IsNotEmpty()
  @IsString()
  desc: string;

  @IsNotEmpty()
  @IsString()
  spec_n_detail: string;
}
