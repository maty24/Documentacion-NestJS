import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { BrandService } from '../brand/brand.service';

import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private producRepository: Repository<Product>,
    private brandsService: BrandService,
    private categoryService: CategoriesService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const newProduct = this.producRepository.create(createProductDto);
    if (createProductDto.brandId) {
      const brand = await this.brandsService.findOne(createProductDto.brandId);
      newProduct.brand = brand;
    }
    if (createProductDto.categoriesIds) {
      const categories = await this.categoryService.findOne(
        createProductDto.categoriesIds,
      );
      //asginamos los productos a la categoria
      newProduct.categories = categories;
    }
    return this.producRepository.save(newProduct);
  }

  findAll() {
    return this.producRepository.find({
      relations: ['brand', 'categories'],
    });
  }

  async findOne(id: number) {
    const product = await this.producRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.producRepository.findOneBy({ id });
    if (updateProductDto.brandId) {
      const brand = await this.brandsService.findOne(updateProductDto.brandId);
      product.brand = brand;
    }
    this.producRepository.merge(product, updateProductDto);
    return this.producRepository.save(product);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
