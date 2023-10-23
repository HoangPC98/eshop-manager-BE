import { BadRequestException, HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppRepository } from 'src/database/app-repository';
import { AppDataSource } from 'src/database/datasource';
import { Orders } from 'src/database/entities/order.entity';
import { Product } from 'src/database/entities/product.entity';
import { PeriodFilter } from 'src/types/enum.type';
import { Between, DataSource, LessThan, Repository } from 'typeorm';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Injectable()
export class VendorService {
  constructor(
    private readonly repository: AppRepository
  ) { }
  private log = new Logger(VendorService.name);

  earningByOneProductCaculator(product: Product) {
    let sold_number = 0;
    let total_revenue = 0;
    let total_sales_input = 0;
    let profit = 0;

    for (let ordersItem of product.orders) {
      sold_number += ordersItem.quantity;
      total_revenue += ordersItem.total_payment;
      total_sales_input += ordersItem.quantity * product.import_price;
      profit += ordersItem.total_payment - (product.import_price * ordersItem.quantity);
    }

    this.log.debug('total_revenue : ' + total_revenue)
    return {
      sold_number, total_revenue, total_sales_input, profit
    };
  }

  earningByManyProductCaculator(products: Product[]) {
    let total_orders = 0;
    let total_sold_number = 0;
    let total_revenue = 0;
    let total_sale_input = 0;
    let total_profit = 0;
    for (let product of products) {
      let thisProductEarning = this.earningByOneProductCaculator(product);
      total_orders += product.orders.length
      total_sold_number += thisProductEarning.sold_number;
      total_sale_input += thisProductEarning.total_sales_input;
      total_revenue += thisProductEarning.total_revenue;
      total_profit += thisProductEarning.profit
    }

    return {
      total_orders, total_sold_number, total_sale_input, total_revenue, total_profit,
    }
  }

  async getMyShopOverview(userId: string, filter: object) {

    const thisShop = await this.repository.shop.findOne({
      where: { owner_uid: userId, created_at: LessThan(new Date()) },
      relations: {
        products: {
          orders: true
        },
      }
    })

    if (!thisShop)
      throw new BadRequestException("You don't own any shop")
    const resp = {
      shop_profile: {
        name: thisShop.name,
        logo_img: thisShop.logo_img,
        like_number: thisShop.like_number,
        visits_number: thisShop.visits_number,
        rating_score: thisShop.rating_score,
        currency_unit: thisShop.currency_unit
      },
      total_product: thisShop.products.length,
      sale_statistic: this.earningByManyProductCaculator(thisShop.products),
    }

    this.log.debug('result', resp)
    return resp;

  }
  

}
