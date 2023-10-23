import { Module } from '@nestjs/common';
import { ProductManagerService } from './product-manager.service';
import { ProductManagerController } from './product-manager.controller';

@Module({
  controllers: [ProductManagerController],
  providers: [ProductManagerService]
})
export class ProductManagerModule {}
