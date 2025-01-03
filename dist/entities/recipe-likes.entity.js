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
exports.RecipeLikes = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
const recipes_entity_1 = require("./recipes.entity");
let RecipeLikes = class RecipeLikes {
};
exports.RecipeLikes = RecipeLikes;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RecipeLikes.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.Users, (user) => user.id, { onDelete: 'CASCADE' }),
    __metadata("design:type", users_entity_1.Users)
], RecipeLikes.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => recipes_entity_1.Recipes, (recipe) => recipe.id, { onDelete: 'CASCADE' }),
    __metadata("design:type", recipes_entity_1.Recipes)
], RecipeLikes.prototype, "recipe", void 0);
exports.RecipeLikes = RecipeLikes = __decorate([
    (0, typeorm_1.Entity)()
], RecipeLikes);
//# sourceMappingURL=recipe-likes.entity.js.map