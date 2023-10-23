import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/database/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepo: Repository<Category>,
  ){}

  async createNew(createCategoryBody: CreateCategoryDto) {
    const newCategory = {
      id: createCategoryBody.slug,
      ...createCategoryBody,
    }
    const createNewCate = await this.categoryRepo.save(newCategory)
    return createNewCate
  }

  async findAll() {
    const allRec = await this.categoryRepo.find({})
    return allRec;
  }

  findOne(id: number) {
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
  }

  remove(id: number) {
  }
}
