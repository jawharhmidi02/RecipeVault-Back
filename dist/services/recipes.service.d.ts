import { JwtService } from '@nestjs/jwt';
import { Recipes } from 'src/entities/recipes.entity';
import { Repository } from 'typeorm';
import { RecipesCreate, RecipesResponse, RecipesUpdate } from 'src/dto/recipes.dto';
import { ApiResponse } from 'src/common/interfaces/response.interface';
import { Users } from 'src/entities/users.entity';
export declare class RecipesService {
    private recipeRepository;
    private jwtService;
    private usersRepository;
    constructor(recipeRepository: Repository<Recipes>, jwtService: JwtService, usersRepository: Repository<Users>);
    create(recipe: RecipesCreate, access_token?: string): Promise<ApiResponse<RecipesResponse>>;
    findAll(page?: number, limit?: number): Promise<ApiResponse<{
        data: RecipesResponse[];
        totalPages: number;
        currentPage: number;
        totalItems: number;
    }>>;
    findById(id: string): Promise<ApiResponse<RecipesResponse>>;
    findByTitle(title: string): Promise<ApiResponse<RecipesResponse[]>>;
    search(page: number, limit: number, sortBy: 'date' | 'alpha', sortOrder: 'asc' | 'desc', filters: {
        title?: string;
        ingredientsLocation?: string;
        cuisineLocation?: string;
        tag?: string;
        type?: string;
        difficulty?: string;
    }): Promise<ApiResponse<{
        data: RecipesResponse[];
        totalPages: number;
        currentPage: number;
        totalItems: number;
    }>>;
    update(id: string, recipe: RecipesUpdate, access_token: string): Promise<ApiResponse<RecipesResponse>>;
    delete(id: string, access_token: string): Promise<ApiResponse<RecipesResponse>>;
}
