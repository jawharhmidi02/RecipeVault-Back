import { Category } from 'src/entities/categories.entity';
import { IsString, IsNumber } from 'class-validator';
import { ProductResponse } from './products.dto';
import { Product } from 'src/entities/products.entity';

export class CategoryCreate {
  @IsString()
  name: string;

  @IsString()
  img: string;

  @IsNumber()
  products_number: number;
}

export class CategoryUpdate {
  @IsString()
  name: string;

  @IsString()
  img: string;

  @IsNumber()
  products_number: number;
}

export class CategoryResponse {
  id: string;
  name: string;
  img: string;
  products_number: number;
  products: Product[];

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
    this.img = category.img;
    this.products_number = category.products_number;
  }
}
