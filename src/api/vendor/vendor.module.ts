import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from 'src/database/entities/shop.entity';
import { User } from 'src/database/entities/user.entity';
import { AppRepository } from 'src/database/app-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Shop, User]), AppRepository ],
  controllers: [VendorController],
  providers: [VendorService, AppRepository]
})
export class VendorModule {}
