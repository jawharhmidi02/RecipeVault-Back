import { Users } from 'src/entities/users.entity';
import { Recipes } from 'src/entities/recipes.entity';
import { RecipeLikes } from 'src/entities/recipe-likes.entity';
import { IsObject } from 'class-validator';
import { UsersResponse } from './users.dto';
import { RecipesResponse } from './recipes.dto';

export class RecipeLikesCreate {
  @IsObject()
  recipe: Recipes;
}

export class RecipeLikesResponse {
  id: string;
  user: UsersResponse;
  recipe: RecipesResponse;

  constructor(recipeLikes: RecipeLikes) {
    this.user = new UsersResponse(recipeLikes.user);
    this.recipe = new RecipesResponse(recipeLikes.recipe);
    this.id = recipeLikes.id;
  }
}
