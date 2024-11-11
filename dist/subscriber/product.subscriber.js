"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSubscriber = void 0;
const typeorm_1 = require("typeorm");
const products_entity_1 = require("../entities/products.entity");
const categories_entity_1 = require("../entities/categories.entity");
let ProductSubscriber = class ProductSubscriber {
    listenTo() {
        return products_entity_1.Product;
    }
    async afterInsert(event) {
        await this.updateProductCount(event.entity.category.id, event.manager);
    }
    async beforeRemove(event) {
        const product = await event.manager.findOne(products_entity_1.Product, {
            where: { id: event.entityId },
            relations: ['category'],
        });
        if (product.category.id) {
            console.log('test');
            const productCount = await event.manager.count(products_entity_1.Product, {
                where: { category: { id: product.category.id } },
            });
            await event.manager.update(categories_entity_1.Category, product.category.id, {
                products_number: productCount - 1,
            });
        }
    }
    async afterRemove(event) {
        if (event.entityId) {
            const removedProduct = await event.manager.findOne(products_entity_1.Product, {
                where: { id: event.entityId },
                relations: ['category'],
            });
            if (removedProduct?.category?.id) {
                await this.updateProductCount(removedProduct.category.id, event.manager);
            }
        }
    }
    async afterUpdate(event) {
        const oldCategoryId = event.databaseEntity?.category.id;
        const newCategoryId = event.entity?.category?.id;
        if (oldCategoryId !== newCategoryId) {
            await this.updateProductCount(oldCategoryId, event.manager);
            await this.updateProductCount(newCategoryId, event.manager);
        }
    }
    async updateProductCount(categoryId, manager) {
        if (categoryId) {
            const productCount = await manager.count(products_entity_1.Product, {
                where: { category: { id: categoryId } },
            });
            await manager.update(categories_entity_1.Category, categoryId, {
                products_number: productCount,
            });
        }
    }
};
exports.ProductSubscriber = ProductSubscriber;
exports.ProductSubscriber = ProductSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], ProductSubscriber);
//# sourceMappingURL=product.subscriber.js.map