import { RecipeLikesCreate } from 'src/dto/recipelikes.dto';
import { RecipeLikesResponse } from 'src/dto/recipelikes.dto';
import { RecipeLikesService } from 'src/services/recipeLikes.service';
import { ApiResponse } from 'src/common/interfaces/response.interface';
export declare class RecipeLikesController {
    private readonly recipeLikesService;
    constructor(recipeLikesService: RecipeLikesService);
    create(data: RecipeLikesCreate, access_token?: string): Promise<ApiResponse<RecipeLikesResponse>>;
    findAll(): Promise<ApiResponse<RecipeLikesResponse[]>>;
    findOne(id: string): Promise<ApiResponse<RecipeLikesResponse>>;
    findByRecipeID(id: string): Promise<ApiResponse<RecipeLikesResponse[]>>;
    findByUserID(id: string): Promise<ApiResponse<RecipeLikesResponse[]>>;
}
