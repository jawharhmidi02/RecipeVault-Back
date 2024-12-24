"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeLikesModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_constant_1 = require("../constants/jwt.constant");
const recipe_likes_controller_1 = require("../controllers/recipe-likes.controller");
const recipe_likes_entity_1 = require("../entities/recipe-likes.entity");
const recipes_entity_1 = require("../entities/recipes.entity");
const users_entity_1 = require("../entities/users.entity");
const notifications_gateway_1 = require("../notifications/notifications.gateway");
const recipe_likes_service_1 = require("../services/recipe-likes.service");
let RecipeLikesModule = class RecipeLikesModule {
};
exports.RecipeLikesModule = RecipeLikesModule;
exports.RecipeLikesModule = RecipeLikesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([recipe_likes_entity_1.RecipeLikes, users_entity_1.Users, recipes_entity_1.Recipes]),
            jwt_1.JwtModule.register({ secret: jwt_constant_1.jwtConstants.secret, global: true }),
        ],
        providers: [recipe_likes_service_1.RecipeLikesService, notifications_gateway_1.NotificationsGateway],
        controllers: [recipe_likes_controller_1.RecipeLikesController],
    })
], RecipeLikesModule);
//# sourceMappingURL=recipe-likes.module.js.map