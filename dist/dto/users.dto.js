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
exports.UsersResponse = exports.UsersUpdate = exports.UsersCreate = void 0;
const class_validator_1 = require("class-validator");
class UsersCreate {
}
exports.UsersCreate = UsersCreate;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsersCreate.prototype, "full_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsersCreate.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsersCreate.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsersCreate.prototype, "phone", void 0);
class UsersUpdate {
}
exports.UsersUpdate = UsersUpdate;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsersUpdate.prototype, "full_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsersUpdate.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsersUpdate.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsersUpdate.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UsersUpdate.prototype, "dialogues", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsersUpdate.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsersUpdate.prototype, "nonce", void 0);
class UsersResponse {
    constructor(user) {
        this.dialogues = user.dialogues;
        this.email = user.email;
        this.id = user.id;
        this.full_name = user.full_name;
        this.phone = user.phone;
        this.role = user.role;
        this.nonce = user.nonce;
    }
}
exports.UsersResponse = UsersResponse;
//# sourceMappingURL=users.dto.js.map