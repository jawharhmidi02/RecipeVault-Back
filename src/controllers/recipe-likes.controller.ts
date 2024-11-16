import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Headers,
  Query,
} from '@nestjs/common';
import { RecipeLikesCreate } from 'src/dto/recipe-likes.dto';
import { RecipeLikesResponse } from 'src/dto/recipe-likes.dto';
import { RecipeLikesService } from 'src/services/recipe-likes.service';
import { ApiResponse } from 'src/common/interfaces/response.interface';

@Controller('recipelikes')
export class RecipeLikesController {
  constructor(private readonly recipeLikesService: RecipeLikesService) {}

  @Post()
  async create(
    @Body() data: RecipeLikesCreate,
    @Headers('access_token') access_token?: string,
  ): Promise<ApiResponse<RecipeLikesResponse>> {
    return this.recipeLikesService.create(data, access_token);
  }

  @Get()
  async findAll(): Promise<ApiResponse<RecipeLikesResponse[]>> {
    return this.recipeLikesService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponse<RecipeLikesResponse>> {
    return this.recipeLikesService.findOne(id);
  }

  @Get('/recipe/:id')
  async findByRecipeID(
    @Param('id') id: string,
  ): Promise<ApiResponse<RecipeLikesResponse[]>> {
    return this.recipeLikesService.findByRecipeID(id);
  }

  @Get('/user/:id')
  async findByUserID(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Param('id') id: string,
  ): Promise<
    ApiResponse<{
      data: RecipeLikesResponse[];
      totalPages: number;
      currentPage: number;
      totalItems: number;
    }>
  > {
    return this.recipeLikesService.findByUserID(page, limit, id);
  }
}
