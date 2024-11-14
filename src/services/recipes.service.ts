import { JwtService } from '@nestjs/jwt';
import { Recipes } from 'src/entities/recipes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { FindManyOptions, Like, Repository } from 'typeorm';
import {
  RecipesCreate,
  RecipesResponse,
  RecipesUpdate,
} from 'src/dto/recipes.dto';
import { ApiResponse } from 'src/common/interfaces/response.interface';
import { Users } from 'src/entities/users.entity';
import { UsersResponse } from 'src/dto/users.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipes)
    private recipeRepository: Repository<Recipes>,
    private jwtService: JwtService,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(
    recipe: RecipesCreate,
    access_token?: string,
  ): Promise<ApiResponse<RecipesResponse>> {
    try {
      const payLoad = await this.jwtService.verifyAsync(access_token);

      const account = await this.usersRepository.findOne({
        where: { id: payLoad.id },
      });

      if (
        !account ||
        account.nonce !== payLoad.nonce ||
        (account.role !== 'admin' &&
          account.role !== 'client' &&
          account.role !== 'specialist')
      ) {
        return {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'Unauthorized access',
          data: null,
        };
      }

      let is_approved = false;
      let approvedAt = null;

      if (account.role === 'admin' || account.role === 'specialist') {
        is_approved = true;
        approvedAt = new Date();
      }

      const savedRecipe = await this.recipeRepository.save({
        ...recipe,
        is_approved,
        approvedAt,
        user: new UsersResponse(account),
      });
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Recipe created successfully',
        data: new RecipesResponse(savedRecipe),
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Failed to create recipe',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<
    ApiResponse<{
      data: RecipesResponse[];
      totalPages: number;
      currentPage: number;
      totalItems: number;
    }>
  > {
    try {
      const [response, totalItems] = await this.recipeRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        relations: ['user'],
      });

      const data = response.map((recipe) => {
        const r = new RecipesResponse(recipe);
        return {
          ...r,
          user: new UsersResponse(recipe.user),
        };
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Recipes retrieved successfully',
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
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to retrieve Recipes',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<ApiResponse<RecipesResponse>> {
    try {
      const response = await this.recipeRepository.findOne({
        where: { id },
        relations: ['user'],
      });

      if (!response)
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Recipe not found',
          data: null,
        };

      const data = new RecipesResponse(response);

      return {
        statusCode: HttpStatus.OK,
        message: 'Recipe retrieved successfully',
        data: { ...data, user: new UsersResponse(response.user) },
      };
    } catch (error) {
      console.log(error);

      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to retrieve Recipe',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByTitle(title: string): Promise<ApiResponse<RecipesResponse[]>> {
    try {
      const response = await this.recipeRepository.find({
        where: { title: Like(`%${title}%`) },
        relations: ['user'],
      });

      const data = response.map((recipe) => {
        const r = new RecipesResponse(recipe);
        return {
          ...r,
          user: new UsersResponse(recipe.user),
        };
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Recipe retrieved successfully',
        data,
      };
    } catch (error) {
      console.log(error);

      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to retrieve Recipes',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async search(
    page: number = 1,
    limit: number = 10,
    sortBy: 'date' | 'alpha' = 'date',
    sortOrder: 'asc' | 'desc' = 'desc',
    filters: {
      title?: string;
      ingredientsLocation?: string;
      cuisineLocation?: string;
      tag?: string;
      type?: string;
      difficulty?: string;
    },
  ): Promise<
    ApiResponse<{
      data: RecipesResponse[];
      totalPages: number;
      currentPage: number;
      totalItems: number;
    }>
  > {
    try {
      const queryBuilder = this.recipeRepository.createQueryBuilder('recipe');
      queryBuilder.leftJoinAndSelect('recipe.user', 'user');
      queryBuilder.skip((page - 1) * limit).take(limit);

      if (filters.title) {
        queryBuilder.andWhere('recipe.title LIKE :title', {
          title: `%${filters.title}%`,
        });
      }

      if (filters.difficulty) {
        queryBuilder.andWhere('recipe.difficulty LIKE :difficulty', {
          difficulty: `%${filters.difficulty}%`,
        });
      }

      if (filters.tag) {
        queryBuilder.orWhere("ARRAY_TO_STRING(recipe.tags, ',') LIKE :tag", {
          tag: `%${filters.tag}%`,
        });
      }

      if (filters.type) {
        queryBuilder.andWhere('recipe.type LIKE :type', {
          type: `%${filters.type}%`,
        });
      }

      if (filters.ingredientsLocation) {
        queryBuilder.andWhere(
          'recipe.ingredientsLocation LIKE :ingredientsLocation',
          {
            ingredientsLocation: `%${filters.ingredientsLocation}%`,
          },
        );
      }

      if (filters.cuisineLocation) {
        queryBuilder.andWhere('recipe.cuisineLocation LIKE :cuisineLocation', {
          cuisineLocation: `%${filters.cuisineLocation}%`,
        });
      }

      let order: 'ASC' | 'DESC' = sortOrder === 'asc' ? 'ASC' : 'DESC';
      if (sortBy === 'date') {
        queryBuilder.orderBy('recipe.approvedAt', order);
      } else if (sortBy === 'alpha') {
        queryBuilder.orderBy('recipe.title', order);
      }

      const [recipes, totalItems] = await queryBuilder.getManyAndCount();

      const data = recipes.map((recipe) => {
        const r = new RecipesResponse(recipe);
        return {
          ...r,
          user: new UsersResponse(recipe.user),
        };
      });

      const totalPages = Math.ceil(totalItems / limit);

      return {
        statusCode: HttpStatus.OK,
        message: 'Recipes retrieved successfully',
        data: {
          data,
          totalPages,
          currentPage: page,
          totalItems,
        },
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to retrieve Recipes',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: string,
    recipe: RecipesUpdate,
    access_token: string,
  ): Promise<ApiResponse<RecipesResponse>> {
    try {
      const payLoad = await this.jwtService.verifyAsync(access_token);

      const account = await this.usersRepository.findOne({
        where: { id: payLoad.id },
      });

      const testResponse = await this.recipeRepository.findOne({
        where: { id },
        relations: ['user'],
      });

      if (!account || account.nonce !== payLoad.nonce) {
        return {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'Unauthorized access',
          data: null,
        };
      }

      if (!testResponse) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Recipe not found',
          data: null,
        };
      }

      if (account.role !== 'admin') {
        if (account.id !== testResponse.user.id) {
          return {
            statusCode: HttpStatus.FORBIDDEN,
            message: 'Unauthorized access',
            data: null,
          };
        }
      }

      if (account.role === 'client') {
        delete recipe.is_approved;
        delete recipe.approvedAt;
        delete recipe.rejection_reason;
        delete recipe.is_rejected;
      }
      if (account.role === 'specialist') {
        if (recipe.is_approved === true && testResponse.is_approved === false) {
          recipe.approvedAt = new Date();
        }
        await this.recipeRepository.update(id, {
          is_approved: recipe.is_approved,
          is_rejected: recipe.is_rejected,
          rejection_reason: recipe.rejection_reason,
          approvedAt: recipe.approvedAt,
        });
      } else {
        recipe.title = recipe.title || testResponse.title;
        await this.recipeRepository.update(id, recipe);
      }

      const response = await this.recipeRepository.findOne({
        where: { id },
        relations: ['user'],
      });

      const data = new RecipesResponse(response);

      return {
        statusCode: HttpStatus.OK,
        message: 'Recipe updated successfully',
        data: { ...data, user: new UsersResponse(response.user) },
      };
    } catch (error) {
      console.log(error);

      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to Update Recipe',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(
    id: string,
    access_token: string,
  ): Promise<ApiResponse<RecipesResponse>> {
    try {
      const payLoad = await this.jwtService.verifyAsync(access_token);
      const account = await this.usersRepository.findOne({
        where: { id: payLoad.id },
      });
      const response = await this.recipeRepository.findOne({
        where: { id },
        relations: ['user'],
      });

      if (!account || account.nonce !== payLoad.nonce) {
        return {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'Unauthorized access',
          data: null,
        };
      }

      if (!response) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Recipe not found',
          data: null,
        };
      }

      if (account.role !== 'admin') {
        if (account.id !== response.user.id) {
          return {
            statusCode: HttpStatus.FORBIDDEN,
            message: 'Unauthorized access',
            data: null,
          };
        }
      }

      await this.recipeRepository.delete(id);

      const data = new RecipesResponse(response);

      return {
        statusCode: HttpStatus.OK,
        message: 'Recipe deleted successfully',
        data: { ...data, user: new UsersResponse(response.user) },
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to Delete Recipe',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

// async search(
//   page: number = 1,
//   limit: number = 10,
//   sortBy: 'date' | 'alpha' = 'date',
//   sortOrder: 'asc' | 'desc' = 'desc',
//   filters: {
//     title?: string;
//     ingredientsLocation?: string;
//     cuisineLocation?: string;
//     tag?: string;
//     type: 'Starter' | 'Main' | 'Desert' | 'Snack' | 'Breakfast' | 'Beverage';
//   },
// ): Promise<
//   ApiResponse<{
//     data: RecipesResponse[];
//     totalPages: number;
//     currentPage: number;
//     totalItems: number;
//   }>
// > {
//   try {
//     const queryOptions: FindManyOptions<Recipes> = {
//       skip: (page - 1) * limit,
//       take: limit,
//       where: { is_approved: true },
//       relations: ['user'],
//       order: {},
//     };

//     if (filters.title) {
//       queryOptions.where['title'] = Like(`%${filters.title}%`);
//     }
//     if (filters.type) {
//       queryOptions.where['type'] = Like(`%${filters.type}%`);
//     }
//     if (filters.ingredientsLocation) {
//       queryOptions.where['ingredientsLocation'] = Like(
//         `%${filters.ingredientsLocation}%`,
//       );
//     }
//     if (filters.cuisineLocation) {
//       queryOptions.where['cuisineLocation'] = Like(
//         `%${filters.cuisineLocation}%`,
//       );
//     }
//     if (filters.tag) {
//       queryOptions.where['tags'] = Like(`%${filters.tag}%`);
//     }

//     if (sortBy === 'date') {
//       queryOptions.order['approvedAt'] = sortOrder;
//     } else if (sortBy === 'alpha') {
//       queryOptions.order['title'] = sortOrder;
//     }

//     const [recipes, totalItems] =
//       await this.recipeRepository.findAndCount(queryOptions);

//     const data = recipes.map((recipe) => {
//       const r = new RecipesResponse(recipe);
//       return {
//         ...r,
//         user: new UsersResponse(recipe.user),
//       };
//     });

//     const totalPages = Math.ceil(totalItems / limit);

//     return {
//       statusCode: HttpStatus.OK,
//       message: 'Recipes retrieved successfully',
//       data: {
//         data,
//         totalPages,
//         currentPage: page,
//         totalItems,
//       },
//     };
//   } catch (error) {
//     console.error(error);
//     throw new HttpException(
//       {
//         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//         message: error.message || 'Failed to retrieve Recipes',
//       },
//       HttpStatus.INTERNAL_SERVER_ERROR,
//     );
//   }
// }