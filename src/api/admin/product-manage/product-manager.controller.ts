import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductManagerService } from './product-manager.service';
import { CreateProductManagerDto } from './dto/create-product-manager.dto';
import { UpdateProductManagerDto } from './dto/update-product-manager.dto';

@Controller('product-manager')
export class ProductManagerController {
  constructor(private readonly productManagerService: ProductManagerService) {}

  @Post()
  create(@Body() createProductManagerDto: CreateProductManagerDto) {
    return this.productManagerService.create(createProductManagerDto);
  }

  @Get()
  findAll() {
    return this.productManagerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productManagerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductManagerDto: UpdateProductManagerDto) {
    return this.productManagerService.update(+id, updateProductManagerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productManagerService.remove(+id);
  }
}
