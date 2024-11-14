import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiResponse } from 'src/common/interfaces/response.interface';
import {
  RecipesCreate,
  RecipesResponse,
  RecipesUpdate,
} from 'src/dto/recipes.dto';
import { RecipesService } from 'src/services/recipes.service';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipesService) {}

  @Post()
  async create(
    @Body() recipeDto: RecipesCreate,
    @Headers('access_token') access_token?: string,
  ): Promise<ApiResponse<RecipesResponse>> {
    return await this.recipeService.create(recipeDto, access_token);
  }

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<
    ApiResponse<{
      data: RecipesResponse[];
      totalPages: number;
      currentPage: number;
      totalItems: number;
    }>
  > {
    return this.recipeService.findAll(page, limit);
  }

  @Get('/byid/:id')
  findById(@Param('id') id: string): Promise<ApiResponse<RecipesResponse>> {
    return this.recipeService.findById(id);
  }

  @Get('/bytitle/:title')
  findByTitle(
    @Param('title') title: string,
  ): Promise<ApiResponse<RecipesResponse[]>> {
    return this.recipeService.findByTitle(title);
  }

  @Get('/search')
  async search(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortBy') sortBy: 'date' | 'alpha' = 'date',
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'desc',
    @Query('title') title?: string,
    @Query('ingredientsLocation') ingredientsLocation?: string,
    @Query('cuisineLocation') cuisineLocation?: string,
    @Query('tag') tag?: string,
    @Query('difficulty') difficulty?: 'Easy' | 'Medium' | 'Hard',
    @Query('type')
    type?: 'Starter' | 'Main' | 'Desert' | 'Snack' | 'Breakfast' | 'Beverage',
  ): Promise<
    ApiResponse<{
      data: RecipesResponse[];
      totalPages: number;
      currentPage: number;
      totalItems: number;
    }>
  > {
    return this.recipeService.search(page, limit, sortBy, sortOrder, {
      title,
      ingredientsLocation,
      cuisineLocation,
      tag,
      type,
      difficulty,
    });
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() recipe: RecipesUpdate,
    @Headers('access_token') access_token: string,
  ): Promise<ApiResponse<RecipesResponse>> {
    return this.recipeService.update(id, recipe, access_token);
  }

  @Delete(':id')
  delete(
    @Param('id') id: string,
    @Headers('access_token') access_token: string,
  ): Promise<ApiResponse<RecipesResponse>> {
    return this.recipeService.delete(id, access_token);
  }
}