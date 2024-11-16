import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeLikes } from 'src/entities/recipe-likes.entity';
import { RecipeLikesCreate } from 'src/dto/recipe-likes.dto';
import { ApiResponse } from 'src/common/interfaces/response.interface';
import { Users } from 'src/entities/users.entity';
import { Recipes } from 'src/entities/recipes.entity';
import { UsersResponse } from 'src/dto/users.dto';
import { RecipeLikesResponse } from 'src/dto/recipe-likes.dto';
import { JwtService } from '@nestjs/jwt';
import { RecipesResponse } from 'src/dto/recipes.dto';

@Injectable()
export class RecipeLikesService {
  constructor(
    @InjectRepository(RecipeLikes)
    private recipeLikesRepository: Repository<RecipeLikes>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Recipes)
    private recipesRepository: Repository<Recipes>,
    private jwtService: JwtService,
  ) {}

  async create(
    data: RecipeLikesCreate,
    access_token: string,
  ): Promise<ApiResponse<RecipeLikesResponse>> {
    try {
      const payLoad = await this.jwtService.verifyAsync(access_token);

      if (!payLoad) {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized access',
          data: null,
        };
      }

      if (!data.recipe) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'User and recipe are required',
          data: null,
        };
      }

      const user = await this.usersRepository.findOne({
        where: { id: payLoad.id },
      });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const recipe = await this.recipesRepository.findOne({
        where: { id: data.recipe.id },
      });
      if (!recipe) {
        throw new HttpException('Recipe not found', HttpStatus.NOT_FOUND);
      }

      const verifyLike = await this.recipeLikesRepository.findOne({
        where: { user: { id: payLoad.id }, recipe: { id: data.recipe.id } },
        relations: ['user', 'recipe'],
      });
      if (verifyLike) {
        await this.recipeLikesRepository.delete(verifyLike.id);

        return {
          statusCode: HttpStatus.OK,
          message: 'Recipe like deleted successfully',
          data: verifyLike,
        };
      }

      const recipeLike = this.recipeLikesRepository.create({ user, recipe });
      const savedRecipeLike = await this.recipeLikesRepository.save(recipeLike);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Recipe like created successfully',
        data: {
          id: savedRecipeLike.id,
          recipe: new RecipesResponse(savedRecipeLike.recipe),
          user: new UsersResponse(savedRecipeLike.user),
        },
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Failed to create recipe like',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<ApiResponse<RecipeLikesResponse[]>> {
    try {
      const recipeLikes = await this.recipeLikesRepository.find({
        relations: ['user', 'recipe'],
      });
      const data = recipeLikes.map((like) => new RecipeLikesResponse(like));

      return {
        statusCode: HttpStatus.OK,
        message: 'Recipe likes retrieved successfully',
        data,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to retrieve recipe likes',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<ApiResponse<RecipeLikesResponse>> {
    try {
      const recipeLike = await this.recipeLikesRepository.findOne({
        where: { id },
        relations: ['user', 'recipe'],
      });

      if (!recipeLike) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Recipe like not found',
          data: null,
        };
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Recipe like retrieved successfully',
        data: new RecipeLikesResponse(recipeLike),
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to retrieve recipe like',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByRecipeID(
    id: string,
  ): Promise<ApiResponse<RecipeLikesResponse[]>> {
    try {
      const recipeLike = await this.recipeLikesRepository.find({
        where: { recipe: { id } },
        relations: ['user', 'recipe'],
      });

      if (!recipeLike) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Recipe like not found',
          data: null,
        };
      }

      const data = recipeLike.map((like) => new RecipeLikesResponse(like));

      return {
        statusCode: HttpStatus.OK,
        message: 'Recipe likes Of Recipe retrieved successfully',
        data,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to retrieve recipe like',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByUserID(
    page: number = 1,
    limit: number = 10,
    id: string,
  ): Promise<
    ApiResponse<{
      data: RecipeLikesResponse[];
      totalPages: number;
      currentPage: number;
      totalItems: number;
    }>
  > {
    try {
      const [recipeLike, totalItems] =
        await this.recipeLikesRepository.findAndCount({
          skip: (page - 1) * limit,
          take: limit,
          where: { user: { id } },
          relations: ['user', 'recipe'],
        });

      const data = recipeLike.map((like) => new RecipeLikesResponse(like));

      return {
        statusCode: HttpStatus.OK,
        message: 'User Likes retrieved successfully',
        data: {
          data: data,
          totalPages: Math.ceil(totalItems / limit),
          currentPage: page,
          totalItems,
        },
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to retrieve recipe like',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
