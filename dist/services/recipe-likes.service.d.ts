import { Repository } from 'typeorm';
import { RecipeLikes } from 'src/entities/recipe-likes.entity';
import { RecipeLikesCreate } from 'src/dto/recipe-likes.dto';
import { ApiResponse } from 'src/common/interfaces/response.interface';
import { Users } from 'src/entities/users.entity';
import { Recipes } from 'src/entities/recipes.entity';
import { RecipeLikesResponse } from 'src/dto/recipe-likes.dto';
import { JwtService } from '@nestjs/jwt';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';
export declare class RecipeLikesService {
    private recipeLikesRepository;
    private usersRepository;
    private recipesRepository;
    private jwtService;
    private readonly notificationsGateway;
    constructor(recipeLikesRepository: Repository<RecipeLikes>, usersRepository: Repository<Users>, recipesRepository: Repository<Recipes>, jwtService: JwtService, notificationsGateway: NotificationsGateway);
    create(data: RecipeLikesCreate, access_token: string): Promise<ApiResponse<RecipeLikesResponse>>;
    findAll(): Promise<ApiResponse<RecipeLikesResponse[]>>;
    findOne(id: string): Promise<ApiResponse<RecipeLikesResponse>>;
    findByRecipeID(id: string): Promise<ApiResponse<RecipeLikesResponse[]>>;
    findByUserID(page: number, limit: number, id: string): Promise<ApiResponse<{
        data: RecipeLikesResponse[];
        totalPages: number;
        currentPage: number;
        totalItems: number;
    }>>;
}
