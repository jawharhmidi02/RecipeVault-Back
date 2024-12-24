import { JwtService } from '@nestjs/jwt';
import { Recipes } from 'src/entities/recipes.entity';
import { Repository } from 'typeorm';
import { RecipesCreate, RecipesResponse, RecipesUpdate } from 'src/dto/recipes.dto';
import { ApiResponse } from 'src/common/interfaces/response.interface';
import { Users } from 'src/entities/users.entity';
import { RecipeLikes } from 'src/entities/recipe-likes.entity';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';
export declare class RecipesService {
    private recipeRepository;
    private jwtService;
    private usersRepository;
    private recipeLikesRepository;
    private readonly notificationsGateway;
    constructor(recipeRepository: Repository<Recipes>, jwtService: JwtService, usersRepository: Repository<Users>, recipeLikesRepository: Repository<RecipeLikes>, notificationsGateway: NotificationsGateway);
    create(recipe: RecipesCreate, access_token: string): Promise<ApiResponse<RecipesResponse>>;
    uploadPhoto(id: string, access_token: string, file: any): Promise<ApiResponse<RecipesResponse>>;
    findAll(page?: number, limit?: number): Promise<ApiResponse<{
        data: RecipesResponse[];
        totalPages: number;
        currentPage: number;
        totalItems: number;
    }>>;
    findAllOrderLikes(page?: number, limit?: number): Promise<ApiResponse<{
        data: RecipesResponse[];
        totalPages: number;
        currentPage: number;
        totalItems: number;
    }>>;
    findAllByUserId(page: number, limit: number, id: string): Promise<ApiResponse<{
        data: RecipesResponse[];
        totalPages: number;
        currentPage: number;
        totalItems: number;
    }>>;
    findPending(page: number, limit: number, access_token: string): Promise<ApiResponse<{
        data: RecipesResponse[];
        totalPages: number;
        currentPage: number;
        totalItems: number;
    }>>;
    findRejectedByUserId(page: number, limit: number, id: string): Promise<ApiResponse<{
        data: RecipesResponse[];
        totalPages: number;
        currentPage: number;
        totalItems: number;
    }>>;
    findPendingByUserId(page: number, limit: number, id: string): Promise<ApiResponse<{
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
