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
exports.RecipeLikesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const recipe_likes_entity_1 = require("../entities/recipe-likes.entity");
const users_entity_1 = require("../entities/users.entity");
const recipes_entity_1 = require("../entities/recipes.entity");
const users_dto_1 = require("../dto/users.dto");
const recipe_likes_dto_1 = require("../dto/recipe-likes.dto");
const jwt_1 = require("@nestjs/jwt");
const recipes_dto_1 = require("../dto/recipes.dto");
const notifications_gateway_1 = require("../notifications/notifications.gateway");
let RecipeLikesService = class RecipeLikesService {
    constructor(recipeLikesRepository, usersRepository, recipesRepository, jwtService, notificationsGateway) {
        this.recipeLikesRepository = recipeLikesRepository;
        this.usersRepository = usersRepository;
        this.recipesRepository = recipesRepository;
        this.jwtService = jwtService;
        this.notificationsGateway = notificationsGateway;
    }
    async create(data, access_token) {
        try {
            const payLoad = await this.jwtService.verifyAsync(access_token);
            if (!payLoad) {
                return {
                    statusCode: common_1.HttpStatus.UNAUTHORIZED,
                    message: 'Unauthorized access',
                    data: null,
                };
            }
            if (!data.recipe) {
                return {
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: 'User and recipe are required',
                    data: null,
                };
            }
            const user = await this.usersRepository.findOne({
                where: { id: payLoad.id },
            });
            if (!user) {
                throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
            const recipe = await this.recipesRepository.findOne({
                where: { id: data.recipe.id },
                relations: ['user'],
            });
            if (!recipe) {
                throw new common_1.HttpException('Recipe not found', common_1.HttpStatus.NOT_FOUND);
            }
            const verifyLike = await this.recipeLikesRepository.findOne({
                where: { user: { id: payLoad.id }, recipe: { id: data.recipe.id } },
                relations: ['user', 'recipe'],
            });
            if (verifyLike) {
                await this.recipeLikesRepository.delete(verifyLike.id);
                return {
                    statusCode: common_1.HttpStatus.OK,
                    message: 'Recipe like deleted successfully',
                    data: verifyLike,
                };
            }
            const recipeLike = this.recipeLikesRepository.create({ user, recipe });
            const savedRecipeLike = await this.recipeLikesRepository.save(recipeLike);
            if (recipe.user && recipe.user.id && recipe.user.id !== user.id) {
                this.notificationsGateway.notifyUserForLike(recipe.user.id, {
                    type: 'recipe_liked',
                    message: `${user.full_name} liked your recipe: ${recipe.title}`,
                    recipeId: recipe.id,
                });
            }
            return {
                statusCode: common_1.HttpStatus.CREATED,
                message: 'Recipe like created successfully',
                data: {
                    id: savedRecipeLike.id,
                    recipe: new recipes_dto_1.RecipesResponse(savedRecipeLike.recipe),
                    user: new users_dto_1.UsersResponse(savedRecipeLike.user),
                },
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException(error.message || 'Failed to create recipe like', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll() {
        try {
            const recipeLikes = await this.recipeLikesRepository.find({
                relations: ['user', 'recipe'],
            });
            const data = recipeLikes.map((like) => new recipe_likes_dto_1.RecipeLikesResponse(like));
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Recipe likes retrieved successfully',
                data,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('Failed to retrieve recipe likes', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const recipeLike = await this.recipeLikesRepository.findOne({
                where: { id },
                relations: ['user', 'recipe'],
            });
            if (!recipeLike) {
                return {
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: 'Recipe like not found',
                    data: null,
                };
            }
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Recipe like retrieved successfully',
                data: new recipe_likes_dto_1.RecipeLikesResponse(recipeLike),
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('Failed to retrieve recipe like', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findByRecipeID(id) {
        try {
            const recipeLike = await this.recipeLikesRepository.find({
                where: { recipe: { id } },
                relations: ['user', 'recipe'],
            });
            if (!recipeLike) {
                return {
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: 'Recipe like not found',
                    data: null,
                };
            }
            const data = recipeLike.map((like) => new recipe_likes_dto_1.RecipeLikesResponse(like));
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Recipe likes Of Recipe retrieved successfully',
                data,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('Failed to retrieve recipe like', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findByUserID(page = 1, limit = 10, id) {
        try {
            const [recipeLike, totalItems] = await this.recipeLikesRepository.findAndCount({
                skip: (page - 1) * limit,
                take: limit,
                where: { user: { id } },
                relations: ['user', 'recipe'],
            });
            const data = recipeLike.map((like) => new recipe_likes_dto_1.RecipeLikesResponse(like));
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'User Likes retrieved successfully',
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
            throw new common_1.HttpException('Failed to retrieve recipe like', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.RecipeLikesService = RecipeLikesService;
exports.RecipeLikesService = RecipeLikesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(recipe_likes_entity_1.RecipeLikes)),
    __param(1, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __param(2, (0, typeorm_1.InjectRepository)(recipes_entity_1.Recipes)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        notifications_gateway_1.NotificationsGateway])
], RecipeLikesService);
//# sourceMappingURL=recipe-likes.service.js.map