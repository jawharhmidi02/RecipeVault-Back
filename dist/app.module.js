"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const connect_module_1 = require("./connect.module");
const users_module_1 = require("./modules/users.module");
const ping_database_module_1 = require("./modules/ping_database.module");
const recipes_module_1 = require("./modules/recipes.module");
const recipe_likes_module_1 = require("./modules/recipe-likes.module");
const forms_module_1 = require("./modules/forms.module");
const notifications_gateway_1 = require("./notifications/notifications.gateway");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            connect_module_1.ConnectModule,
            users_module_1.UserModule,
            ping_database_module_1.PingModule,
            recipes_module_1.RecipesModule,
            recipe_likes_module_1.RecipeLikesModule,
            forms_module_1.FormsModule,
        ],
        providers: [notifications_gateway_1.NotificationsGateway],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map