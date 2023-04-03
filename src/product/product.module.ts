import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { BrandModule } from '../brand/brand.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  //forfutere es que se debe importar el modulo de la base de datos
  imports: [TypeOrmModule.forFeature([Product]), BrandModule,CategoriesModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
