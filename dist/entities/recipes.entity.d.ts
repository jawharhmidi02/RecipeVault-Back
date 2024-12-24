import { Users } from './users.entity';
export declare class Recipes {
    id: string;
    title: string;
    steps: string[];
    description: string;
    ingredientsLocation: string;
    cuisineLocation: string;
    img: string;
    ingredients: string[];
    is_approved: boolean;
    is_rejected: boolean;
    rejection_reason: string;
    approvedAt: Date;
    user: Users;
    tags: string[];
    utensils: string[];
    type: 'Starter' | 'Main' | 'Dessert' | 'Snack' | 'Breakfast' | 'Beverage';
    difficulty: 'Easy' | 'Medium' | 'Hard';
    prepTime: number;
    bakingTime: number;
    restingTime: number;
}
