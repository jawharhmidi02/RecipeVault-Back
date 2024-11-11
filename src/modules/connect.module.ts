import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Users } from 'src/entities/users.entity';
import { Category } from 'src/entities/categories.entity';
import { Product } from 'src/entities/products.entity';
import { ProductSubscriber } from 'src/subscriber/product.subscriber';

dotenv.config();

const {
  SUPABASE_HOST,
  SUPABASE_PORT,
  SUPABASE_USERNAME,
  SUPABASE_PASSWORD,
  SUPABASE_DATABASE,
} = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: SUPABASE_HOST,
      port: parseInt(SUPABASE_PORT, 10),
      username: SUPABASE_USERNAME,
      password: SUPABASE_PASSWORD,
      database: SUPABASE_DATABASE,
      entities: [Users, Category, Product],
      synchronize: true,
      subscribers: [ProductSubscriber],
    }),
  ],
})
export class ConnectModule {}
