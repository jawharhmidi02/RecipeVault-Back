import { IsString, IsArray, IsObject } from 'class-validator';
import { Product } from 'src/entities/products.entity';
import { Category } from 'src/entities/categories.entity';

export class ProductCreate {
  @IsString()
  name: string;

  @IsString()
  img: string;

  @IsArray()
  description: string[];

  @IsObject()
  category: Category;
}

export class ProductUpdate {
  @IsString()
  name: string;

  @IsString()
  img: string;

  @IsArray({ each: true })
  description: string[];

  @IsObject()
  category: Category;
}

export class ProductResponse {
  id: string;
  name: string;
  img: string;
  category: Category;
  description: string[];

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.img = product.img;
    this.description = product.description;
    this.category = product.category;
  }
}
