import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { Product } from 'src/entities/products.entity';
import { Category } from 'src/entities/categories.entity';

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
  listenTo() {
    return Product;
  }

  async afterInsert(event: InsertEvent<Product>) {
    await this.updateProductCount(event.entity.category.id, event.manager);
  }

  async beforeRemove(event: RemoveEvent<Product>) {
    const product = await event.manager.findOne(Product, {
      where: { id: event.entityId },
      relations: ['category'],
    });
    if (product.category.id) {
      console.log('test');

      const productCount = await event.manager.count(Product, {
        where: { category: { id: product.category.id } },
      });

      await event.manager.update(Category, product.category.id, {
        products_number: productCount - 1,
      });
    }
  }

  async afterRemove(event: RemoveEvent<Product>) {
    if (event.entityId) {
      const removedProduct = await event.manager.findOne(Product, {
        where: { id: event.entityId },
        relations: ['category'],
      });

      if (removedProduct?.category?.id) {
        await this.updateProductCount(
          removedProduct.category.id,
          event.manager,
        );
      }
    }
  }

  async afterUpdate(event: UpdateEvent<Product>) {
    const oldCategoryId = event.databaseEntity?.category.id;
    const newCategoryId = event.entity?.category?.id;

    if (oldCategoryId !== newCategoryId) {
      await this.updateProductCount(oldCategoryId, event.manager);
      await this.updateProductCount(newCategoryId, event.manager);
    }
  }

  private async updateProductCount(categoryId: string, manager) {
    if (categoryId) {
      const productCount = await manager.count(Product, {
        where: { category: { id: categoryId } },
      });

      await manager.update(Category, categoryId, {
        products_number: productCount,
      });
    }
  }
}
