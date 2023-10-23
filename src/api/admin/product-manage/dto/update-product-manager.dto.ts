import { PartialType } from '@nestjs/mapped-types';
import { CreateProductManagerDto } from './create-product-manager.dto';

export class UpdateProductManagerDto extends PartialType(CreateProductManagerDto) {}
