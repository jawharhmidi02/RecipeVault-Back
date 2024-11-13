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
exports.RecipesService = void 0;
const jwt_1 = require("@nestjs/jwt");
const recipes_entity_1 = require("../entities/recipes.entity");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const recipes_dto_1 = require("../dto/recipes.dto");
const users_entity_1 = require("../entities/users.entity");
const users_dto_1 = require("../dto/users.dto");
let RecipesService = class RecipesService {
    constructor(recipeRepository, jwtService, usersRepository) {
        this.recipeRepository = recipeRepository;
        this.jwtService = jwtService;
        this.usersRepository = usersRepository;
    }
    async create(recipe, access_token) {
        try {
            const payLoad = await this.jwtService.verifyAsync(access_token);
            const account = await this.usersRepository.findOne({
                where: { id: payLoad.id },
            });
            if (!account ||
                account.nonce !== payLoad.nonce ||
                (account.role !== 'admin' &&
                    account.role !== 'client' &&
                    account.role !== 'specialist')) {
                return {
                    statusCode: common_1.HttpStatus.FORBIDDEN,
                    message: 'Unauthorized access',
                    data: null,
                };
            }
            let is_approved = false;
            let approvedAt = null;
            if (account.role === 'admin' || account.role === 'specialist') {
                is_approved = true;
                approvedAt = new Date();
            }
            const savedRecipe = await this.recipeRepository.save({
                ...recipe,
                is_approved,
                approvedAt,
                user: new users_dto_1.UsersResponse(account),
            });
            return {
                statusCode: common_1.HttpStatus.CREATED,
                message: 'Recipe created successfully',
                data: new recipes_dto_1.RecipesResponse(savedRecipe),
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException(error.message || 'Failed to create recipe', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll(page = 1, limit = 10) {
        try {
            const [response, totalItems] = await this.recipeRepository.findAndCount({
                skip: (page - 1) * limit,
                take: limit,
                relations: ['user'],
            });
            const data = response.map((recipe) => {
                const r = new recipes_dto_1.RecipesResponse(recipe);
                return {
                    ...r,
                    user: new users_dto_1.UsersResponse(recipe.user),
                };
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Recipes retrieved successfully',
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
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message || 'Failed to retrieve Recipes',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findById(id) {
        try {
            const response = await this.recipeRepository.findOne({
                where: { id },
                relations: ['user'],
            });
            if (!response)
                return {
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: 'Recipe not found',
                    data: null,
                };
            const data = new recipes_dto_1.RecipesResponse(response);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Recipe retrieved successfully',
                data: { ...data, user: new users_dto_1.UsersResponse(response.user) },
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message || 'Failed to retrieve Recipe',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findByTitle(title) {
        try {
            const response = await this.recipeRepository.find({
                where: { title: (0, typeorm_2.Like)(`%${title}%`) },
                relations: ['user'],
            });
            const data = response.map((recipe) => {
                const r = new recipes_dto_1.RecipesResponse(recipe);
                return {
                    ...r,
                    user: new users_dto_1.UsersResponse(recipe.user),
                };
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Recipe retrieved successfully',
                data,
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message || 'Failed to retrieve Recipes',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async search(page = 1, limit = 10, sortBy = 'date', sortOrder = 'desc', filters) {
        try {
            const queryBuilder = this.recipeRepository.createQueryBuilder('recipe');
            queryBuilder.leftJoinAndSelect('recipe.user', 'user');
            queryBuilder.skip((page - 1) * limit).take(limit);
            if (filters.title) {
                queryBuilder.andWhere('recipe.title LIKE :title', {
                    title: `%${filters.title}%`,
                });
            }
            if (filters.difficulty) {
                queryBuilder.andWhere('recipe.difficulty LIKE :difficulty', {
                    difficulty: `%${filters.difficulty}%`,
                });
            }
            if (filters.tag) {
                queryBuilder.orWhere("ARRAY_TO_STRING(recipe.tags, ',') LIKE :tag", {
                    tag: `%${filters.tag}%`,
                });
            }
            if (filters.type) {
                queryBuilder.andWhere('recipe.type LIKE :type', {
                    type: `%${filters.type}%`,
                });
            }
            if (filters.ingredientsLocation) {
                queryBuilder.andWhere('recipe.ingredientsLocation LIKE :ingredientsLocation', {
                    ingredientsLocation: `%${filters.ingredientsLocation}%`,
                });
            }
            if (filters.cuisineLocation) {
                queryBuilder.andWhere('recipe.cuisineLocation LIKE :cuisineLocation', {
                    cuisineLocation: `%${filters.cuisineLocation}%`,
                });
            }
            let order = sortOrder === 'asc' ? 'ASC' : 'DESC';
            if (sortBy === 'date') {
                queryBuilder.orderBy('recipe.approvedAt', order);
            }
            else if (sortBy === 'alpha') {
                queryBuilder.orderBy('recipe.title', order);
            }
            const [recipes, totalItems] = await queryBuilder.getManyAndCount();
            const data = recipes.map((recipe) => {
                const r = new recipes_dto_1.RecipesResponse(recipe);
                return {
                    ...r,
                    user: new users_dto_1.UsersResponse(recipe.user),
                };
            });
            const totalPages = Math.ceil(totalItems / limit);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Recipes retrieved successfully',
                data: {
                    data,
                    totalPages,
                    currentPage: page,
                    totalItems,
                },
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message || 'Failed to retrieve Recipes',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, recipe, access_token) {
        try {
            const payLoad = await this.jwtService.verifyAsync(access_token);
            const account = await this.usersRepository.findOne({
                where: { id: payLoad.id },
            });
            const testResponse = await this.recipeRepository.findOne({
                where: { id },
                relations: ['user'],
            });
            if (!account || account.nonce !== payLoad.nonce) {
                return {
                    statusCode: common_1.HttpStatus.FORBIDDEN,
                    message: 'Unauthorized access',
                    data: null,
                };
            }
            if (!testResponse) {
                return {
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: 'Recipe not found',
                    data: null,
                };
            }
            if (account.role !== 'admin') {
                if (account.id !== testResponse.user.id) {
                    return {
                        statusCode: common_1.HttpStatus.FORBIDDEN,
                        message: 'Unauthorized access',
                        data: null,
                    };
                }
            }
            if (account.role === 'client') {
                delete recipe.is_approved;
                delete recipe.approvedAt;
                delete recipe.rejection_reason;
                delete recipe.is_rejected;
            }
            if (account.role === 'specialist') {
                if (recipe.is_approved === true && testResponse.is_approved === false) {
                    recipe.approvedAt = new Date();
                }
                await this.recipeRepository.update(id, {
                    is_approved: recipe.is_approved,
                    is_rejected: recipe.is_rejected,
                    rejection_reason: recipe.rejection_reason,
                    approvedAt: recipe.approvedAt,
                });
            }
            else {
                recipe.title = recipe.title || testResponse.title;
                await this.recipeRepository.update(id, recipe);
            }
            const response = await this.recipeRepository.findOne({
                where: { id },
                relations: ['user'],
            });
            const data = new recipes_dto_1.RecipesResponse(response);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Recipe updated successfully',
                data: { ...data, user: new users_dto_1.UsersResponse(response.user) },
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message || 'Failed to Update Recipe',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(id, access_token) {
        try {
            const payLoad = await this.jwtService.verifyAsync(access_token);
            const account = await this.usersRepository.findOne({
                where: { id: payLoad.id },
            });
            const response = await this.recipeRepository.findOne({
                where: { id },
                relations: ['user'],
            });
            if (!account || account.nonce !== payLoad.nonce) {
                return {
                    statusCode: common_1.HttpStatus.FORBIDDEN,
                    message: 'Unauthorized access',
                    data: null,
                };
            }
            if (!response) {
                return {
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: 'Recipe not found',
                    data: null,
                };
            }
            if (account.role !== 'admin') {
                if (account.id !== response.user.id) {
                    return {
                        statusCode: common_1.HttpStatus.FORBIDDEN,
                        message: 'Unauthorized access',
                        data: null,
                    };
                }
            }
            await this.recipeRepository.delete(id);
            const data = new recipes_dto_1.RecipesResponse(response);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Recipe deleted successfully',
                data: { ...data, user: new users_dto_1.UsersResponse(response.user) },
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message || 'Failed to Delete Recipe',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.RecipesService = RecipesService;
exports.RecipesService = RecipesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(recipes_entity_1.Recipes)),
    __param(2, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        typeorm_2.Repository])
], RecipesService);
//# sourceMappingURL=recipes.service.js.map