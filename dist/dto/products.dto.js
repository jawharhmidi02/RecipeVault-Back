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
exports.ProductResponse = exports.ProductUpdate = exports.ProductCreate = void 0;
const class_validator_1 = require("class-validator");
const categories_entity_1 = require("../entities/categories.entity");
class ProductCreate {
}
exports.ProductCreate = ProductCreate;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductCreate.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductCreate.prototype, "img", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ProductCreate.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", categories_entity_1.Category)
], ProductCreate.prototype, "category", void 0);
class ProductUpdate {
}
exports.ProductUpdate = ProductUpdate;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductUpdate.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductUpdate.prototype, "img", void 0);
__decorate([
    (0, class_validator_1.IsArray)({ each: true }),
    __metadata("design:type", Array)
], ProductUpdate.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", categories_entity_1.Category)
], ProductUpdate.prototype, "category", void 0);
class ProductResponse {
    constructor(product) {
        this.id = product.id;
        this.name = product.name;
        this.img = product.img;
        this.description = product.description;
        this.category = product.category;
    }
}
exports.ProductResponse = ProductResponse;
//# sourceMappingURL=products.dto.js.map