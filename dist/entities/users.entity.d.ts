import { Recipes } from './recipes.entity';
import { RecipeLikes } from './recipeLikes.entity';
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
}
