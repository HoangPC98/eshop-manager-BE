import { Controller, Get, Req, Post, Body, Patch, Param, Delete, Query, ForbiddenException, UseInterceptors, UploadedFiles, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Request } from 'express';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import UploadFileImgInterceptor from 'src/interceptors/uploadFile.interceptor';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post('/new')
  @UseInterceptors(UploadFileImgInterceptor())
  async newProduct(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body) {
    console.log('FILE...', files);
    return await this.productService.createNew(files, JSON.parse(body.base_info))
  }

  @Get('/shopping-browse')
  getAllProductForShoppingBrowse(@Req() req, @Query() query) {

    const vendorUserId = req.user.userId
    return this.productService.getAllProductForShoppingBrowse(vendorUserId);
  }

  @Get('/list')
  getAllOfMyShopProduct(@Req() req, @Query() query) {
    if (req.user.userRole !== 'vendor')
      throw new ForbiddenException('you are not a vendor')
    const vendorUserId = req.user.userId 
    return this.productService.getAllOfMyShopProduct(vendorUserId);
  }

  @Get('/detail/:id')
  getProductDetail( @Param() param) {
    console.log('id', param.id)
    return this.productService.getOneProductById(param.id);
  }

  @Delete('/delete/:id')
  deleteProductById(@Req() req, @Param() params) {
    if (req.user.userRole !== 'vendor' || !req.user.ownShop)
      throw new ForbiddenException()
    return this.productService.deleteProductById(req.user.ownShop, params.id);
  }

  @Get('/all-for-users-browse')
  getAllProductForUserBrowse(){
    return this.productService.fetchAllProductForUserBrowse()
  }

  @Get('/fetch-for-create-product')
  fetchForCreateNewProduct(@Req() req, @Query() query) {
    if (req.user.userRole !== 'vendor')
      throw new ForbiddenException('not a vendor')
    const userId = req.user.userId;
    return this.productService.fetchForCreateNewProduct(req.user.userId, 'kf6hb6')
  }
}
