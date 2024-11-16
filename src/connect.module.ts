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
      entities: [Users, RecipeLikes, Recipes, Forms],
      synchronize: true,
      subscribers: [],
    }),
  ],
})
export class ConnectModule {}
