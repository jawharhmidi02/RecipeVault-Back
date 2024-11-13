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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipesResponse = exports.RecipesUpdate = exports.RecipesCreate = exports.DifficultyType = exports.RecipeType = void 0;
const class_validator_1 = require("class-validator");
var RecipeType;
(function (RecipeType) {
    RecipeType["Starter"] = "Starter";
    RecipeType["Main"] = "Main";
    RecipeType["Desert"] = "Desert";
    RecipeType["Snack"] = "Snack";
    RecipeType["Breakfast"] = "Breakfast";
    RecipeType["Beverage"] = "Beverage";
})(RecipeType || (exports.RecipeType = RecipeType = {}));
var DifficultyType;
(function (DifficultyType) {
    DifficultyType["Easy"] = "Easy";
    DifficultyType["Medium"] = "Medium";
    DifficultyType["Hard"] = "Hard";
})(DifficultyType || (exports.DifficultyType = DifficultyType = {}));
class RecipesCreate {
}
exports.RecipesCreate = RecipesCreate;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecipesCreate.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], RecipesCreate.prototype, "steps", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecipesCreate.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecipesCreate.prototype, "ingredientsLocation", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecipesCreate.prototype, "cuisineLocation", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecipesCreate.prototype, "img", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], RecipesCreate.prototype, "ingredients", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], RecipesCreate.prototype, "tags", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(RecipeType),
    __metadata("design:type", String)
], RecipesCreate.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(DifficultyType),
    __metadata("design:type", String)
], RecipesCreate.prototype, "difficulty", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RecipesCreate.prototype, "prepTime", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RecipesCreate.prototype, "bakingTime", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RecipesCreate.prototype, "restingTime", void 0);
class RecipesUpdate {
}
exports.RecipesUpdate = RecipesUpdate;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecipesUpdate.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Array)
], RecipesUpdate.prototype, "steps", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecipesUpdate.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecipesUpdate.prototype, "ingredientsLocation", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecipesUpdate.prototype, "cuisineLocation", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecipesUpdate.prototype, "img", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], RecipesUpdate.prototype, "ingredients", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], RecipesUpdate.prototype, "tags", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(RecipeType),
    __metadata("design:type", String)
], RecipesUpdate.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], RecipesUpdate.prototype, "is_approved", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], RecipesUpdate.prototype, "is_rejected", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecipesUpdate.prototype, "rejection_reason", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], RecipesUpdate.prototype, "approvedAt", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(DifficultyType),
    __metadata("design:type", String)
], RecipesUpdate.prototype, "difficulty", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RecipesUpdate.prototype, "prepTime", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RecipesUpdate.prototype, "bakingTime", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RecipesUpdate.prototype, "restingTime", void 0);
class RecipesResponse {
    constructor(recipe) {
        this.id = recipe.id;
        this.title = recipe.title;
        this.steps = recipe.steps;
        this.description = recipe.description;
        this.ingredientsLocation = recipe.ingredientsLocation;
        this.ingredients = recipe.ingredients;
        this.is_approved = recipe.is_approved;
        this.is_rejected = recipe.is_rejected;
        this.rejection_reason = recipe.rejection_reason;
        this.approvedAt = recipe.approvedAt;
        this.user = recipe.user;
        this.img = recipe.img;
        this.cuisineLocation = recipe.cuisineLocation;
        this.tags = recipe.tags;
        this.type = recipe.type;
    }
}
exports.RecipesResponse = RecipesResponse;
//# sourceMappingURL=recipes.dto.js.map