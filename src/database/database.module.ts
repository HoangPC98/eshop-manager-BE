import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { Session } from './entities/session.entity';
import { Shop } from './entities/shop.entity';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { Orders } from './entities/order.entity';
import { UserRole } from './entities/roles_users.entity';
import { Role } from './entities/role.entity';
import { UserProfile } from './entities/user_profile.entity';
import { AppDataSource } from './datasource';
 
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [
         __dirname + '/entities/*.entity.{js,ts}', UserProfile, User, Shop
        ],
        // synchronize: true,
        // autoLoadEntities: true,
        logging: true,
      })
    }),
  ],
})
export class DatabaseModule {}
