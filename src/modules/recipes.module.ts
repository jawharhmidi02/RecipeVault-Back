import { RecipeController } from '../controllers/recipes.controller';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from 'src/constants/jwt.constant';
import { RecipeLikes } from 'src/entities/recipe-likes.entity';
import { Recipes } from 'src/entities/recipes.entity';
import { Users } from 'src/entities/users.entity';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';
import { RecipesService } from 'src/services/recipes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipes, Users, RecipeLikes]),
    JwtModule.register({ secret: jwtConstants.secret, global: true }),
  ],
  providers: [RecipesService, NotificationsGateway],
  controllers: [RecipeController],
})
export class RecipesModule {}
