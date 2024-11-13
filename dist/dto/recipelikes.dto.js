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
exports.RecipeLikesResponse = exports.RecipeLikesCreate = void 0;
const recipes_entity_1 = require("../entities/recipes.entity");
const class_validator_1 = require("class-validator");
const users_dto_1 = require("./users.dto");
const recipes_dto_1 = require("./recipes.dto");
class RecipeLikesCreate {
}
exports.RecipeLikesCreate = RecipeLikesCreate;
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", recipes_entity_1.Recipes)
], RecipeLikesCreate.prototype, "recipe", void 0);
class RecipeLikesResponse {
    constructor(recipeLikes) {
        this.user = new users_dto_1.UsersResponse(recipeLikes.user);
        this.recipe = new recipes_dto_1.RecipesResponse(recipeLikes.recipe);
        this.id = recipeLikes.id;
    }
}
exports.RecipeLikesResponse = RecipeLikesResponse;
//# sourceMappingURL=recipelikes.dto.js.map