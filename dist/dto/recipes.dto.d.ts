import { Recipes } from 'src/entities/recipes.entity';
import { UsersResponse } from './users.dto';
export declare enum RecipeType {
    Starter = "Starter",
    Main = "Main",
    Desert = "Desert",
    Snack = "Snack",
    Breakfast = "Breakfast",
    Beverage = "Beverage"
}
export declare enum DifficultyType {
    Easy = "Easy",
    Medium = "Medium",
    Hard = "Hard"
}
export declare class RecipesCreate {
    title: string;
    steps: string[];
    description: string;
    ingredientsLocation: string;
    cuisineLocation: string;
    img: string;
    ingredients: string[];
    tags: string[];
    type: RecipeType;
    difficulty: DifficultyType;
    prepTime: number;
    bakingTime: number;
    restingTime: number;
}
export declare class RecipesUpdate {
    title: string;
    steps: string[];
    description: string;
    ingredientsLocation: string;
    cuisineLocation: string;
    img: string;
    ingredients: string[];
    tags: string[];
    type: RecipeType;
    is_approved: boolean;
    is_rejected: boolean;
    rejection_reason: string;
    approvedAt: Date;
    difficulty: DifficultyType;
    prepTime: number;
    bakingTime: number;
    restingTime: number;
}
export declare class RecipesResponse {
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
    constructor(recipe: Recipes);
}
