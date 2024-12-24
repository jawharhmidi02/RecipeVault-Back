import { FormsCreate } from 'src/dto/forms.dto';
import { FormsResponse } from 'src/dto/forms.dto';
import { FormsService } from 'src/services/forms.service';
import { ApiResponse } from 'src/common/interfaces/response.interface';
export declare class FormsController {
    private readonly formsService;
    constructor(formsService: FormsService);
    create(data: FormsCreate, access_token: string, file: any): Promise<ApiResponse<FormsResponse>>;
    findAll(page: number, limit: number, access_token: string): Promise<ApiResponse<{
        data: FormsResponse[];
        totalPages: number;
        currentPage: number;
        totalItems: number;
    }>>;
    findOne(id: string, access_token: string): Promise<ApiResponse<FormsResponse>>;
    findByUserID(id: string, access_token: string): Promise<ApiResponse<FormsResponse[]>>;
    Accept(id: string, access_token: string): Promise<ApiResponse<FormsResponse>>;
    delete(id: string, access_token: string): Promise<ApiResponse<FormsResponse>>;
}
