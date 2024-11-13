import { Repository } from 'typeorm';
import { RecipeLikes } from 'src/entities/recipelikes.entity';
import { RecipeLikesCreate } from 'src/dto/recipelikes.dto';
import { ApiResponse } from 'src/common/interfaces/response.interface';
import { Users } from 'src/entities/users.entity';
import { Recipes } from 'src/entities/recipes.entity';
import { RecipeLikesResponse } from 'src/dto/recipelikes.dto';
import { JwtService } from '@nestjs/jwt';
export declare class RecipeLikesService {
    private recipeLikesRepository;
    private usersRepository;
    private recipesRepository;
    private jwtService;
    constructor(recipeLikesRepository: Repository<RecipeLikes>, usersRepository: Repository<Users>, recipesRepository: Repository<Recipes>, jwtService: JwtService);
    create(data: RecipeLikesCreate, access_token: string): Promise<ApiResponse<RecipeLikesResponse>>;
    findAll(): Promise<ApiResponse<RecipeLikesResponse[]>>;
    findOne(id: string): Promise<ApiResponse<RecipeLikesResponse>>;
    findByRecipeID(id: string): Promise<ApiResponse<RecipeLikesResponse[]>>;
    findByUserID(id: string): Promise<ApiResponse<RecipeLikesResponse[]>>;
}
