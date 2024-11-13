import { Recipes } from 'src/entities/recipes.entity';
import {
  IsString,
  IsArray,
  IsEnum,
  IsDate,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { UsersResponse } from './users.dto';

export enum RecipeType {
  Starter = 'Starter',
  Main = 'Main',
  Desert = 'Desert',
  Snack = 'Snack',
  Breakfast = 'Breakfast',
  Beverage = 'Beverage',
}

export enum DifficultyType {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export class RecipesCreate {
  @IsString()
  title: string;

  @IsArray()
  @IsString({ each: true })
  steps: string[];

  @IsString()
  description: string;

  @IsString()
  ingredientsLocation: string;

  @IsString()
  cuisineLocation: string;

  @IsString()
  img: string;

  @IsArray()
  @IsString({ each: true })
  ingredients: string[];

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsEnum(RecipeType)
  type: RecipeType;

  @IsEnum(DifficultyType)
  difficulty: DifficultyType;

  @IsNumber()
  prepTime: number;

  @IsNumber()
  bakingTime: number;

  @IsNumber()
  restingTime: number;
}

export class RecipesUpdate {
  @IsString()
  title: string;

  @IsString()
  steps: string[];

  @IsString()
  description: string;

  @IsString()
  ingredientsLocation: string;

  @IsString()
  cuisineLocation: string;

  @IsString()
  img: string;

  @IsArray()
  ingredients: string[];

  @IsArray()
  tags: string[];

  @IsEnum(RecipeType)
  type: RecipeType;

  @IsBoolean()
  is_approved: boolean;

  @IsBoolean()
  is_rejected: boolean;

  @IsString()
  rejection_reason: string;

  @IsDate()
  approvedAt: Date;

  @IsEnum(DifficultyType)
  difficulty: DifficultyType;

  @IsNumber()
  prepTime: number;

  @IsNumber()
  bakingTime: number;

  @IsNumber()
  restingTime: number;
}

export class RecipesResponse {
  id: string;
  title: string;
  steps: string[];
  description: string;
  ingredientsLocation: string;
  cuisineLocation: string;
  ingredients: string[];
  is_approved: boolean;
  is_rejected: boolean;
  rejection_reason: string;
  approvedAt: Date;
  user: UsersResponse;
  img: string;
  tags: string[];
  type: 'Starter' | 'Main' | 'Desert' | 'Snack' | 'Breakfast' | 'Beverage';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  prepTime: number;
  bakingTime: number;
  restingTime: number;

  constructor(recipe: Recipes) {
    this.id = recipe.id;
    this.title = recipe.title;
    this.steps = recipe.steps;
    this.description = recipe.description;
    this.ingredientsLocation = recipe.ingredientsLocation;
    this.ingredients = recipe.ingredients;
    this.is_approved = recipe.is_approved;
    this.is_rejected = recipe.is_rejected;
    this.rejection_reason = recipe.rejection_reason;
    this.approvedAt = recipe.approvedAt;
    this.user = recipe.user;
    this.img = recipe.img;
    this.cuisineLocation = recipe.cuisineLocation;
    this.tags = recipe.tags;
    this.type = recipe.type;
  }
}
