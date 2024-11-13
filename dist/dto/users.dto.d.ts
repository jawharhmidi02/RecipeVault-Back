import { Users } from 'src/entities/users.entity';
import { Recipes } from 'src/entities/recipes.entity';
import { RecipeLikes } from 'src/entities/recipeLikes.entity';
export declare class UsersCreate {
    full_name: string;
    email: string;
    password: string;
    phone: string;
}
export declare class UsersUpdate {
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
export declare class UsersResponse {
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
    constructor(user: Users);
}
