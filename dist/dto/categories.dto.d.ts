import { Category } from 'src/entities/categories.entity';
import { Product } from 'src/entities/products.entity';
export declare class CategoryCreate {
    name: string;
    img: string;
    products_number: number;
}
export declare class CategoryUpdate {
    name: string;
    img: string;
    products_number: number;
}
export declare class CategoryResponse {
    id: string;
    name: string;
    img: string;
    products_number: number;
    products: Product[];
    constructor(category: Category);
}
