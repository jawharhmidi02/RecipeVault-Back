import { EntitySubscriberInterface, InsertEvent, RemoveEvent, UpdateEvent } from 'typeorm';
import { Product } from 'src/entities/products.entity';
export declare class ProductSubscriber implements EntitySubscriberInterface<Product> {
    listenTo(): typeof Product;
    afterInsert(event: InsertEvent<Product>): Promise<void>;
    beforeRemove(event: RemoveEvent<Product>): Promise<void>;
    afterRemove(event: RemoveEvent<Product>): Promise<void>;
    afterUpdate(event: UpdateEvent<Product>): Promise<void>;
    private updateProductCount;
}
