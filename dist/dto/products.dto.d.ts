import { Product } from 'src/entities/products.entity';
import { Category } from 'src/entities/categories.entity';
export declare class ProductCreate {
    name: string;
    img: string;
    description: string[];
    category: Category;
}
export declare class ProductUpdate {
    name: string;
    img: string;
    description: string[];
    category: Category;
}
export declare class ProductResponse {
    id: string;
    name: string;
    img: string;
    category: Category;
    description: string[];
    constructor(product: Product);
}
