import { Recipes } from 'src/entities/recipes.entity';
import { RecipeLikes } from 'src/entities/recipe-likes.entity';
import { UsersResponse } from './users.dto';
import { RecipesResponse } from './recipes.dto';
export declare class RecipeLikesCreate {
    recipe: Recipes;
}
export declare class RecipeLikesResponse {
    id: string;
    user: UsersResponse;
    recipe: RecipesResponse;
    constructor(recipeLikes: RecipeLikes);
}
