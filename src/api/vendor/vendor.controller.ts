import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { Request } from 'express';
import { BaseRoles } from 'src/types/enum.type';

@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) { }

  @Get('/my-shop-overview')
  getMyShopOverview(@Req() req, @Query() query) {

    if (req.user.userRole !== 'vendor')
      throw new ForbiddenException('not a vendor')
    const userId = req.user.userId;
    return this.vendorService.getMyShopOverview(userId, query);
  }

  
}
