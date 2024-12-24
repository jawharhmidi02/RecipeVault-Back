import { Repository } from 'typeorm';
import { Forms } from 'src/entities/forms.entity';
import { FormsCreate } from 'src/dto/forms.dto';
import { ApiResponse } from 'src/common/interfaces/response.interface';
import { Users } from 'src/entities/users.entity';
import { FormsResponse } from 'src/dto/forms.dto';
import { JwtService } from '@nestjs/jwt';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';
export declare class FormsService {
    private formsRepository;
    private usersRepository;
    private jwtService;
    private readonly notificationsGateway;
    constructor(formsRepository: Repository<Forms>, usersRepository: Repository<Users>, jwtService: JwtService, notificationsGateway: NotificationsGateway);
    create(data: FormsCreate, file: any, access_token: string): Promise<ApiResponse<FormsResponse>>;
    findAll(page: number, limit: number, access_token: string): Promise<ApiResponse<{
        data: FormsResponse[];
        totalPages: number;
        currentPage: number;
        totalItems: number;
    }>>;
    findOne(id: string, access_token: string): Promise<ApiResponse<FormsResponse>>;
    findByUserID(id: string, access_token: string): Promise<ApiResponse<FormsResponse[]>>;
    accept(id: string, access_token: string): Promise<ApiResponse<FormsResponse>>;
    reject(id: string, access_token: string): Promise<ApiResponse<FormsResponse>>;
}
