import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/new')
  create(@Body() createCategoryBody: CreateCategoryDto) {
    return this.categoryService.createNew(createCategoryBody);
  }

  @Get('/all')
  findAll() {
    return this.categoryService.findAll();
  }
}
