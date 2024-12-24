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
exports.RecipeLikesController = void 0;
const common_1 = require("@nestjs/common");
const recipe_likes_dto_1 = require("../dto/recipe-likes.dto");
const recipe_likes_service_1 = require("../services/recipe-likes.service");
let RecipeLikesController = class RecipeLikesController {
    constructor(recipeLikesService) {
        this.recipeLikesService = recipeLikesService;
    }
    async create(data, access_token) {
        return this.recipeLikesService.create(data, access_token);
    }
    async findAll() {
        return this.recipeLikesService.findAll();
    }
    async findOne(id) {
        return this.recipeLikesService.findOne(id);
    }
    async findByRecipeID(id) {
        return this.recipeLikesService.findByRecipeID(id);
    }
    async findByUserID(page, limit, id) {
        return this.recipeLikesService.findByUserID(page, limit, id);
    }
};
exports.RecipeLikesController = RecipeLikesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('access_token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recipe_likes_dto_1.RecipeLikesCreate, String]),
    __metadata("design:returntype", Promise)
], RecipeLikesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipeLikesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipeLikesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/recipe/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipeLikesController.prototype, "findByRecipeID", null);
__decorate([
    (0, common_1.Get)('/user/:id'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], RecipeLikesController.prototype, "findByUserID", null);
exports.RecipeLikesController = RecipeLikesController = __decorate([
    (0, common_1.Controller)('recipelikes'),
    __metadata("design:paramtypes", [recipe_likes_service_1.RecipeLikesService])
], RecipeLikesController);
//# sourceMappingURL=recipe-likes.controller.js.map