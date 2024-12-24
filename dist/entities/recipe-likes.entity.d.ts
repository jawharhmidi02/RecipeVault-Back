import { Users } from './users.entity';
import { Recipes } from './recipes.entity';
export declare class RecipeLikes {
    id: string;
    user: Users;
    recipe: Recipes;
}
