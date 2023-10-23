import { AppDataSource } from 'src/database/datasource';
import { Category } from './entities/category.entity';
import { Orders } from './entities/order.entity';
import { Product } from './entities/product.entity';
import { ReviewCmt } from './entities/review_cmt.entity';
import { Shop } from './entities/shop.entity';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/user_profile.entity';


export class AppRepository {
  public readonly dataSource = AppDataSource;
  public readonly user = this.dataSource.manager.getRepository(User)
  public readonly profile = this.dataSource.manager.getRepository(UserProfile)
  public readonly shop = this.dataSource.manager.getRepository(Shop)
  public readonly product = this.dataSource.manager.getRepository(Product)
  public readonly category = this.dataSource.manager.getRepository(Category)
  public readonly orders = this.dataSource.manager.getRepository(Orders)
  public readonly reviewCmt = this.dataSource.manager.getRepository(ReviewCmt)


  public getEntity (entityName: string) {
    return this.dataSource.manager.getRepository(entityName)
  }
}