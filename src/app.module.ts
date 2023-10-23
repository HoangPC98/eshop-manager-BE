import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { CategoryModule } from './api/admin/category-manage/category.module';
import { VendorModule } from './api/vendor/vendor.module';
import { ProductModule } from './api/product/product.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ServingFileModule } from './serving-file/serving-file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
      }),
      envFilePath: '.env',
    }),
    JwtModule.register({
      secret: process.env.JWT_ATOKEN_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public/' 
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    CategoryModule,
    ProductModule,
    VendorModule,
    ServingFileModule
  ],
  controllers: [],
 
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/auth/login-by-google', method: RequestMethod.POST },
        { path: '/auth/login-usrpsw', method: RequestMethod.POST },
        { path: '/auth/sign-up', method: RequestMethod.POST },
        { path: '/auth/refresh-token', method: RequestMethod.POST },
        { path: '/serving-file/img/(.*)', method: RequestMethod.GET },
      )
      .forRoutes({path: '*', method: RequestMethod.ALL});
  }
}
