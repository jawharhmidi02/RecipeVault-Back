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
exports.RecipeController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const recipes_dto_1 = require("../dto/recipes.dto");
const recipes_service_1 = require("../services/recipes.service");
let RecipeController = class RecipeController {
    constructor(recipeService) {
        this.recipeService = recipeService;
    }
    async create(recipeDto, access_token) {
        console.log('body:');
        console.log(recipeDto);
        return await this.recipeService.create(recipeDto, access_token);
    }
    async uploadPhoto(id, access_token, file) {
        return await this.recipeService.uploadPhoto(id, access_token, file);
    }
    findAll(page, limit) {
        return this.recipeService.findAll(page, limit);
    }
    findAllOrderLikes(page, limit) {
        return this.recipeService.findAllOrderLikes(page, limit);
    }
    findAllByUserID(page, limit, id) {
        return this.recipeService.findAllByUserId(page, limit, id);
    }
    findPendingByUserID(page, limit, id) {
        return this.recipeService.findPendingByUserId(page, limit, id);
    }
    findPending(page, limit, access_token) {
        return this.recipeService.findPending(page, limit, access_token);
    }
    findRejectedByUserID(page, limit, id) {
        return this.recipeService.findRejectedByUserId(page, limit, id);
    }
    findById(id) {
        return this.recipeService.findById(id);
    }
    findByTitle(title) {
        return this.recipeService.findByTitle(title);
    }
    async search(page = 1, limit = 10, sortBy = 'date', sortOrder = 'desc', title, ingredientsLocation, cuisineLocation, tag, difficulty, type) {
        return this.recipeService.search(page, limit, sortBy, sortOrder, {
            title,
            ingredientsLocation,
            cuisineLocation,
            tag,
            type,
            difficulty,
        });
    }
    update(id, recipe, access_token) {
        return this.recipeService.update(id, recipe, access_token);
    }
    delete(id, access_token) {
        return this.recipeService.delete(id, access_token);
    }
};
exports.RecipeController = RecipeController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('access_token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recipes_dto_1.RecipesCreate, String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/uploadphoto/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('access_token')),
    __param(2, (0, common_1.UploadedFile)('file')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "uploadPhoto", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/like'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "findAllOrderLikes", null);
__decorate([
    (0, common_1.Get)('/byuserid/:id'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "findAllByUserID", null);
__decorate([
    (0, common_1.Get)('/pending/byuserid/:id'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "findPendingByUserID", null);
__decorate([
    (0, common_1.Get)('/pending'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Headers)('access_token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "findPending", null);
__decorate([
    (0, common_1.Get)('/rejected/byuserid/:id'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "findRejectedByUserID", null);
__decorate([
    (0, common_1.Get)('/byid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)('/bytitle/:title'),
    __param(0, (0, common_1.Param)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "findByTitle", null);
__decorate([
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('sortBy')),
    __param(3, (0, common_1.Query)('sortOrder')),
    __param(4, (0, common_1.Query)('title')),
    __param(5, (0, common_1.Query)('ingredientsLocation')),
    __param(6, (0, common_1.Query)('cuisineLocation')),
    __param(7, (0, common_1.Query)('tag')),
    __param(8, (0, common_1.Query)('difficulty')),
    __param(9, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "search", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('access_token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, recipes_dto_1.RecipesUpdate, String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('access_token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "delete", null);
exports.RecipeController = RecipeController = __decorate([
    (0, common_1.Controller)('recipes'),
    __metadata("design:paramtypes", [recipes_service_1.RecipesService])
], RecipeController);
//# sourceMappingURL=recipes.controller.js.map