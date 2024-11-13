import { ApiResponse } from 'src/common/interfaces/response.interface';
import { RecipesCreate, RecipesResponse, RecipesUpdate } from 'src/dto/recipes.dto';
import { RecipesService } from 'src/services/recipes.service';
export declare class RecipeController {
    private readonly recipeService;
    constructor(recipeService: RecipesService);
    create(recipeDto: RecipesCreate, access_token?: string): Promise<ApiResponse<RecipesResponse>>;
    findAll(page: number, limit: number): Promise<ApiResponse<{
        data: RecipesResponse[];
        totalPages: number;
        currentPage: number;
        totalItems: number;
    }>>;
    findById(id: string): Promise<ApiResponse<RecipesResponse>>;
    findByTitle(title: string): Promise<ApiResponse<RecipesResponse[]>>;
    search(page?: number, limit?: number, sortBy?: 'date' | 'alpha', sortOrder?: 'asc' | 'desc', title?: string, ingredientsLocation?: string, cuisineLocation?: string, tag?: string, difficulty?: 'Easy' | 'Medium' | 'Hard', type?: 'Starter' | 'Main' | 'Desert' | 'Snack' | 'Breakfast' | 'Beverage'): Promise<ApiResponse<{
        data: RecipesResponse[];
        totalPages: number;
        currentPage: number;
        totalItems: number;
    }>>;
    update(id: string, recipe: RecipesUpdate, access_token: string): Promise<ApiResponse<RecipesResponse>>;
    delete(id: string, access_token: string): Promise<ApiResponse<RecipesResponse>>;
}
