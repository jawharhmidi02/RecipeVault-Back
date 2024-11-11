import { Module } from '@nestjs/common';
import { ConnectModule } from 'src/modules/connect.module';
import { UserModule } from './modules/users.module';
import { PingModule } from './modules/ping_database.module';
import { CategoryModule } from './modules/categories.module';
import { ProductModule } from './modules/products.module';

@Module({
  imports: [
    ConnectModule,
    UserModule,
    PingModule,
    CategoryModule,
    ProductModule,
  ],
})
export class AppModule {}
