import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { AppRepository } from 'src/database/app-repository';

@Module({
  imports: [AppRepository, ],
  controllers: [ProductController],
  providers: [ProductService, AppRepository]
})
export class ProductModule {}
