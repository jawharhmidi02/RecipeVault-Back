import { UsersService } from '../services/users.service';
import { UsersUpdate, UsersCreate, UsersResponse, UserProfileResponse } from 'src/dto/users.dto';
import { ApiResponse } from 'src/common/interfaces/response.interface';
export declare class UserController {
    private readonly userService;
    constructor(userService: UsersService);
    signUp(user: UsersCreate): Promise<ApiResponse<UsersResponse>>;
    SignIn(email: string, password: string): Promise<ApiResponse<{
        access_token: string;
    }>>;
    findAll(access_token: string): Promise<ApiResponse<UsersResponse[]>>;
    findAllSpecialists(page: number, limit: number, access_token: string): Promise<ApiResponse<{
        data: UsersResponse[];
        totalPages: number;
        currentPage: number;
        totalItems: number;
    }>>;
    findById(id: string, access_token: string): Promise<ApiResponse<UsersResponse>>;
    getAccount(access_token: string): Promise<ApiResponse<UsersResponse>>;
    getProfile(id: string): Promise<ApiResponse<UserProfileResponse>>;
    update(id: string, access_token: string, user: UsersUpdate): Promise<ApiResponse<UsersResponse>>;
    remove(id: string, access_token: string): Promise<ApiResponse<UsersResponse>>;
    sendRecoverPass(email: string): Promise<ApiResponse<any>>;
    changePasswordFromRecover(access_token: string, password: string): Promise<ApiResponse<UsersResponse>>;
    getRecoverPassHtml(access_token: string): Promise<string>;
}
