"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipesModule = void 0;
const recipes_controller_1 = require("../controllers/recipes.controller");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_constant_1 = require("../constants/jwt.constant");
const recipes_entity_1 = require("../entities/recipes.entity");
const users_entity_1 = require("../entities/users.entity");
const recipes_service_1 = require("../services/recipes.service");
let RecipesModule = class RecipesModule {
};
exports.RecipesModule = RecipesModule;
exports.RecipesModule = RecipesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([recipes_entity_1.Recipes, users_entity_1.Users]),
            jwt_1.JwtModule.register({ secret: jwt_constant_1.jwtConstants.secret, global: true }),
        ],
        providers: [recipes_service_1.RecipesService],
        controllers: [recipes_controller_1.RecipeController],
    })
], RecipesModule);
//# sourceMappingURL=recipes.module.js.map