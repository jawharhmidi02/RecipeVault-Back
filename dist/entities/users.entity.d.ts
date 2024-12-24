import { Recipes } from './recipes.entity';
import { RecipeLikes } from './recipe-likes.entity';
export declare class Users {
    id: string;
    full_name: string;
    email: string;
    password: string;
    phone: string;
    dialogues: string[];
    role: string;
    nonce: string;
    recipes: Recipes[];
    likes: RecipeLikes[];
    acceptions: number;
    rejections: number;
}
