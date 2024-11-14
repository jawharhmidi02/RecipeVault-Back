import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from 'src/constants/jwt.constant';
import { RecipeLikesController } from 'src/controllers/recipe-likes.controller';
import { RecipeLikes } from 'src/entities/recipe-likes.entity';
import { Recipes } from 'src/entities/recipes.entity';
import { Users } from 'src/entities/users.entity';
import { RecipeLikesService } from 'src/services/recipe-likes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecipeLikes, Users, Recipes]),
    JwtModule.register({ secret: jwtConstants.secret, global: true }),
  ],
  providers: [RecipeLikesService],
  controllers: [RecipeLikesController],
})
export class RecipeLikesModule {}
