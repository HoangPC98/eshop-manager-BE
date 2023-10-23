import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppRepository } from 'src/database/app-repository';
import { Orders } from 'src/database/entities/order.entity';
import { Product } from 'src/database/entities/product.entity';
import { Shop } from 'src/database/entities/shop.entity';
import { idGenerator } from 'src/modules/stringGenerator';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly repository: AppRepository,
  ) { }
  async createNew(imageFiles: Array<any>, createProductBody) {
    const newProduct = new Product()

    Object.assign(newProduct, {
      ...createProductBody,
      id: idGenerator(8),
      avatar_image: imageFiles[0].filename,
      list_image: imageFiles.map(item => item.filename),
    },)

    console.log('newProd', newProduct)
    const newProd = await this.repository.product.save(newProduct)
  }

  async makeOrdersRequest(uid: string, ordersBody): Promise<any> {
    const newOrders = new Orders();
    Object.assign(newOrders, ordersBody)
    const newOrder = this.repository.orders
  }

  async getAllOfMyShopProduct(uid: string): Promise<any> {
    const myShop = await this.repository.shop.findOne({
      where: { owner_uid: uid },
      relations: {
        products: true,
      }
    })
    const result = myShop.products.map(item => ({
      ...item,
      avatar_image: item.avatar_image.includes('http') ? item.avatar_image : ('http://localhost:8000/serving-file/img/' + item.avatar_image)
    }))
    return result
  }

  async deleteProductById(ownShopId: string, productId: string) {
    const productRec = await this.repository.product.findOne({
      where: { id: productId, shop_id: ownShopId },
    })

    if (!productRec)
      throw new ForbiddenException()
    await this.repository.product.softDelete(productId)
  }

  async getAllProductForShoppingBrowse(uid: string): Promise<any> {
    const allProduct = await this.repository.product.find({})
    const result = allProduct.map(item => ({
      ...item,
      avatar_image: item.avatar_image.includes('http') ? item.avatar_image : ('http://localhost:8000/serving-file/img/' + item.avatar_image)

    }))
    return result
  }

  async getOneProductById(productId: string): Promise<any> {
    const productRec = await this.repository.product.findOne({ where: { id: productId } })
    console.log('Product Rec...', productId, productRec)
    const listReviewCmt = await this.repository.reviewCmt.find({
      where: { resource_id: productRec.id },
      relations: { user: { profile: true } }
    })
    let listReviewData = listReviewCmt.map(reivewItem=>({
      ...reivewItem,
      user: {
        name: reivewItem.user.username,
        avatar: reivewItem.user.profile.avatar
      }
    }))
    const result = {
      ...productRec,
      avatar_image: productRec.avatar_image.includes('http') ? productRec.avatar_image : ('http://localhost:8000/serving-file/img/' + productRec.avatar_image),
      reviews: listReviewData
    }
    return result
  }

  async fetchAllProductForUserBrowse() {
    return await this.repository.product.find({
      relations: {
        shop: true
      }
    })
  }

  async fetchForCreateNewProduct(uid: string, shopId: string) {
    const thisShop = await this.repository.shop.findOne({
      where: { id: shopId, owner_uid: uid },
    })

    if (!thisShop)
      throw new HttpException('You are not own any shop', 403)

    const listCategory = await this.repository.category.find({
      where: { category_industry_id: thisShop.category_industry }
    })
    return {
      shop_categories: listCategory.map(item => (item.id))
    }
  }
}
