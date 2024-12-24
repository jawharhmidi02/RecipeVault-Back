import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Users } from 'src/entities/users.entity';
import { RecipeLikes } from './entities/recipe-likes.entity';
import { Recipes } from './entities/recipes.entity';
import { Forms } from './entities/forms.entity';

dotenv.config();

const {
  SUPABASE_HOST,
  SUPABASE_PORT,
  SUPABASE_USERNAME,
  SUPABASE_PASSWORD,
  SUPABASE_DATABASE,
  SUPABASE_DATABASE_URL,
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
      url: SUPABASE_DATABASE_URL,
      entities: [Users, RecipeLikes, Recipes, Forms],
      synchronize: true,
    }),
  ],
})
export class ConnectModule {}
