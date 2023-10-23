import { Injectable } from '@nestjs/common';
import { CreateProductManagerDto } from './dto/create-product-manager.dto';
import { UpdateProductManagerDto } from './dto/update-product-manager.dto';

@Injectable()
export class ProductManagerService {
  create(createProductManagerDto: CreateProductManagerDto) {
    return 'This action adds a new productManager';
  }

  findAll() {
    return `This action returns all productManager`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productManager`;
  }

  update(id: number, updateProductManagerDto: UpdateProductManagerDto) {
    return `This action updates a #${id} productManager`;
  }

  remove(id: number) {
    return `This action removes a #${id} productManager`;
  }
}
