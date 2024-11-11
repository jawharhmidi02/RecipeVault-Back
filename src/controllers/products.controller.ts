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
  ProductCreate,
  ProductResponse,
  ProductUpdate,
} from 'src/dto/products.dto';
import { ProductService } from 'src/services/products.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(
    @Body() productDto: ProductCreate,
    @Headers('access_token') access_token?: string,
  ): Promise<ApiResponse<ProductResponse>> {
    return await this.productService.create(productDto, access_token);
  }

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<
    ApiResponse<{
      data: ProductResponse[];
      totalPages: number;
      currentPage: number;
      totalItems: number;
    }>
  > {
    return this.productService.findAll(page, limit);
  }

  @Get('/byid/:id')
  findById(@Param('id') id: string): Promise<ApiResponse<ProductResponse>> {
    return this.productService.findById(id);
  }

  @Get('/byname/:name')
  findByName(
    @Param('name') name: string,
  ): Promise<ApiResponse<ProductResponse[]>> {
    return this.productService.findByName(name);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() product: ProductUpdate,
    @Headers('access_token') access_token: string,
  ): Promise<ApiResponse<ProductResponse>> {
    return this.productService.update(id, product, access_token);
  }

  @Delete(':id')
  delete(
    @Param('id') id: string,
    @Headers('access_token') access_token: string,
  ): Promise<ApiResponse<ProductResponse>> {
    return this.productService.delete(id, access_token);
  }
}
