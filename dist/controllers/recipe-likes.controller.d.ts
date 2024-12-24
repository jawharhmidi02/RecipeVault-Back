import { RecipeLikesCreate } from 'src/dto/recipe-likes.dto';
import { RecipeLikesResponse } from 'src/dto/recipe-likes.dto';
import { RecipeLikesService } from 'src/services/recipe-likes.service';
import { ApiResponse } from 'src/common/interfaces/response.interface';
export declare class RecipeLikesController {
    private readonly recipeLikesService;
    constructor(recipeLikesService: RecipeLikesService);
    create(data: RecipeLikesCreate, access_token?: string): Promise<ApiResponse<RecipeLikesResponse>>;
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
