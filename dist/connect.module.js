"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectModule = void 0;
const dotenv = require("dotenv");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const users_entity_1 = require("./entities/users.entity");
const recipeLikes_entity_1 = require("./entities/recipeLikes.entity");
const recipes_entity_1 = require("./entities/recipes.entity");
dotenv.config();
const { SUPABASE_HOST, SUPABASE_PORT, SUPABASE_USERNAME, SUPABASE_PASSWORD, SUPABASE_DATABASE, } = process.env;
let ConnectModule = class ConnectModule {
};
exports.ConnectModule = ConnectModule;
exports.ConnectModule = ConnectModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: SUPABASE_HOST,
                port: parseInt(SUPABASE_PORT, 10),
                username: SUPABASE_USERNAME,
                password: SUPABASE_PASSWORD,
                database: SUPABASE_DATABASE,
                entities: [users_entity_1.Users, recipeLikes_entity_1.RecipeLikes, recipes_entity_1.Recipes],
                synchronize: true,
                subscribers: [],
            }),
        ],
    })
], ConnectModule);
//# sourceMappingURL=connect.module.js.map