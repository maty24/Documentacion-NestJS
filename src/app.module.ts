import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { BrandModule } from './brand/brand.module';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { CategoriesModule } from './categories/categories.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
    load: [config],
    isGlobal: true,
  }),
   DatabaseModule,
   ProductModule,
   BrandModule,
   UserModule,
   CustomerModule,
   CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
