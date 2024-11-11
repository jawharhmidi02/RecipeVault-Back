import { Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { UsersCreate, UsersResponse, UsersUpdate } from 'src/dto/users.dto';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse } from 'src/common/interfaces/response.interface';
export declare class UsersService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: Repository<Users>, jwtService: JwtService);
    signup(user: UsersCreate): Promise<ApiResponse<UsersResponse>>;
    signin(email: string, password: string): Promise<ApiResponse<{
        access_token: string;
    }>>;
    findAll(access_token: string): Promise<ApiResponse<UsersResponse[]>>;
    findById(id: string, access_token: string): Promise<ApiResponse<UsersResponse>>;
    getAccount(token: string): Promise<ApiResponse<UsersResponse>>;
    update(id: string, user: UsersUpdate, access_token: string): Promise<ApiResponse<UsersResponse>>;
    remove(id: string, access_token: string): Promise<ApiResponse<UsersResponse>>;
}
