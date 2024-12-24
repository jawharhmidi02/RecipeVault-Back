"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const forms_entity_1 = require("../entities/forms.entity");
const users_entity_1 = require("../entities/users.entity");
const forms_dto_1 = require("../dto/forms.dto");
const jwt_1 = require("@nestjs/jwt");
const supabase_js_1 = require("@supabase/supabase-js");
const notifications_gateway_1 = require("../notifications/notifications.gateway");
let FormsService = class FormsService {
    constructor(formsRepository, usersRepository, jwtService, notificationsGateway) {
        this.formsRepository = formsRepository;
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
        this.notificationsGateway = notificationsGateway;
    }
    async create(data, file, access_token) {
        try {
            const payLoad = await this.jwtService.verifyAsync(access_token);
            if (!payLoad) {
                return {
                    statusCode: common_1.HttpStatus.UNAUTHORIZED,
                    message: 'Unauthorized access',
                    data: null,
                };
            }
            const user = await this.usersRepository.findOne({
                where: { id: payLoad.id },
            });
            if (!user || user.role !== 'client') {
                return {
                    statusCode: common_1.HttpStatus.UNAUTHORIZED,
                    message: 'Unauthorized access',
                    data: null,
                };
            }
            let fileName = new Date().getTime() + file.originalname;
            console.log('file');
            console.log(file);
            const supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_API_KEY);
            const { error } = await supabase.storage
                .from('pdfs')
                .upload(fileName, file.buffer, {
                contentType: 'application/pdf',
            });
            if (error)
                throw error;
            const URL = supabase.storage.from('pdfs').getPublicUrl(fileName);
            const form = this.formsRepository.create({
                ...data,
                user,
                cv_pdf: URL.data.publicUrl,
            });
            const savedForm = await this.formsRepository.save(form);
            return {
                statusCode: common_1.HttpStatus.CREATED,
                message: 'Form created successfully',
                data: new forms_dto_1.FormsResponse(savedForm),
            };
        }
        catch (error) {
            console.log(error);
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: error.message || 'Failed to create Form',
                data: null,
            };
        }
    }
    async findAll(page = 1, limit = 10, access_token) {
        try {
            const payLoad = await this.jwtService.verifyAsync(access_token);
            if (!payLoad) {
                return {
                    statusCode: common_1.HttpStatus.UNAUTHORIZED,
                    message: 'Unauthorized access',
                    data: null,
                };
            }
            const userTest = await this.usersRepository.findOne({
                where: { id: payLoad.id },
            });
            if (!userTest) {
                return {
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: 'User not found',
                    data: null,
                };
            }
            if (userTest.role !== 'admin') {
                return {
                    statusCode: common_1.HttpStatus.UNAUTHORIZED,
                    message: 'Unauthorized access',
                    data: null,
                };
            }
            const [response, totalItems] = await this.formsRepository.findAndCount({
                skip: (page - 1) * limit,
                take: limit,
                relations: ['user'],
            });
            const data = response.map((form) => new forms_dto_1.FormsResponse(form));
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Forms retrieved successfully',
                data: {
                    data: data,
                    totalPages: Math.ceil(totalItems / limit),
                    currentPage: page,
                    totalItems,
                },
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('Failed to retrieve Forms', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id, access_token) {
        try {
            const payLoad = await this.jwtService.verifyAsync(access_token);
            if (!payLoad) {
                return {
                    statusCode: common_1.HttpStatus.UNAUTHORIZED,
                    message: 'Unauthorized access',
                    data: null,
                };
            }
            const userTest = await this.usersRepository.findOne({
                where: { id: payLoad.id },
            });
            if (!userTest) {
                return {
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: 'User not found',
                    data: null,
                };
            }
            if (userTest.role !== 'admin') {
                return {
                    statusCode: common_1.HttpStatus.UNAUTHORIZED,
                    message: 'Unauthorized access',
                    data: null,
                };
            }
            const form = await this.formsRepository.findOne({
                where: { id },
                relations: ['user'],
            });
            if (!form) {
                return {
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: 'Form not found',
                    data: null,
                };
            }
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Form retrieved successfully',
                data: new forms_dto_1.FormsResponse(form),
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('Failed to retrieve Form', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findByUserID(id, access_token) {
        try {
            const payLoad = await this.jwtService.verifyAsync(access_token);
            if (!payLoad) {
                return {
                    statusCode: common_1.HttpStatus.UNAUTHORIZED,
                    message: 'Unauthorized access',
                    data: null,
                };
            }
            const userTest = await this.usersRepository.findOne({
                where: { id: payLoad.id },
            });
            if (!userTest) {
                return {
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: 'User not found',
                    data: null,
                };
            }
            if (userTest.role !== 'admin') {
                return {
                    statusCode: common_1.HttpStatus.UNAUTHORIZED,
                    message: 'Unauthorized access',
                    data: null,
                };
            }
            const form = await this.formsRepository.find({
                where: { user: { id } },
                relations: ['user'],
            });
            if (!form) {
                return {
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: 'Form not found',
                    data: null,
                };
            }
            const data = form.map((like) => new forms_dto_1.FormsResponse(like));
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Forms Of User retrieved successfully',
                data,
            };
        }
        catch (error) {
            console.error(error);
            return {
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to retrieve Forms',
                data: null,
            };
        }
    }
    async accept(id, access_token) {
        try {
            const payLoad = await this.jwtService.verifyAsync(access_token);
            if (!payLoad) {
                return {
                    statusCode: common_1.HttpStatus.UNAUTHORIZED,
                    message: 'Unauthorized access',
                    data: null,
                };
            }
            const userTest = await this.usersRepository.findOne({
                where: { id: payLoad.id },
            });
            if (!userTest) {
                return {
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: 'User not found',
                    data: null,
                };
            }
            if (userTest.role !== 'admin') {
                return {
                    statusCode: common_1.HttpStatus.UNAUTHORIZED,
                    message: 'Unauthorized access',
                    data: null,
                };
            }
            const form = await this.formsRepository.findOne({
                where: { id },
                relations: ['user'],
            });
            if (!form) {
                return {
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: 'Form not found',
                    data: null,
                };
            }
            await this.usersRepository.update({ id: form.user.id }, { role: 'specialist' });
            this.notificationsGateway.notifyUserForAcceptedSpecialist(form.user.id, {
                type: 'form_accepted',
                message: `Your form has been accepted, You are now a Specialist Congratulations!`,
                userId: form.user.id,
            });
            await this.formsRepository.remove(form);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Form deleted successfully',
                data: new forms_dto_1.FormsResponse(form),
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('Failed to delete Form', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async reject(id, access_token) {
        try {
            const payLoad = await this.jwtService.verifyAsync(access_token);
            if (!payLoad) {
                return {
                    statusCode: common_1.HttpStatus.UNAUTHORIZED,
                    message: 'Unauthorized access',
                    data: null,
                };
            }
            const userTest = await this.usersRepository.findOne({
                where: { id: payLoad.id },
            });
            if (!userTest) {
                return {
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: 'User not found',
                    data: null,
                };
            }
            if (userTest.role !== 'admin') {
                return {
                    statusCode: common_1.HttpStatus.UNAUTHORIZED,
                    message: 'Unauthorized access',
                    data: null,
                };
            }
            const form = await this.formsRepository.findOne({
                where: { id },
                relations: ['user'],
            });
            if (!form) {
                return {
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: 'Form not found',
                    data: null,
                };
            }
            await this.formsRepository.remove(form);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Form deleted successfully',
                data: new forms_dto_1.FormsResponse(form),
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('Failed to delete Form', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.FormsService = FormsService;
exports.FormsService = FormsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(forms_entity_1.Forms)),
    __param(1, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        notifications_gateway_1.NotificationsGateway])
], FormsService);
//# sourceMappingURL=forms.service.js.map