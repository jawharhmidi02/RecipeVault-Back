import { JwtService } from '@nestjs/jwt';
import { Product } from 'src/entities/products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import {
  ProductCreate,
  ProductResponse,
  ProductUpdate,
} from 'src/dto/products.dto';
import { ApiResponse } from 'src/common/interfaces/response.interface';
import { Users } from 'src/entities/users.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private jwtService: JwtService,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(
    product: ProductCreate,
    access_token?: string,
  ): Promise<ApiResponse<ProductResponse>> {
    try {
      const payLoad = await this.jwtService.verifyAsync(access_token);

      const account = await this.usersRepository.findOne({
        where: { id: payLoad.id },
      });

      if (
        !account ||
        account.nonce !== payLoad.nonce ||
        account.role !== 'admin'
      ) {
        return {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'Unauthorized access',
          data: null,
        };
      }

      const savedProduct = await this.productRepository.save(product);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Product created successfully',
        data: new ProductResponse(savedProduct),
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Failed to create product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<
    ApiResponse<{
      data: ProductResponse[];
      totalPages: number;
      currentPage: number;
      totalItems: number;
    }>
  > {
    try {
      const [response, totalItems] = await this.productRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        relations: ['category'],
      });

      const data = response.map((item) => new ProductResponse(item));

      return {
        statusCode: HttpStatus.OK,
        message: 'Products retrieved successfully',
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
          message: error.message || 'Failed to retrieve Products',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<ApiResponse<ProductResponse>> {
    try {
      const response = await this.productRepository.findOne({
        where: { id },
        relations: ['category'],
      });

      if (!response)
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Product not found',
          data: null,
        };

      const data = new ProductResponse(response);

      return {
        statusCode: HttpStatus.OK,
        message: 'Product retrieved successfully',
        data,
      };
    } catch (error) {
      console.log(error);

      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to retrieve Product',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByName(name: string): Promise<ApiResponse<ProductResponse[]>> {
    try {
      const response = await this.productRepository.find({
        where: { name: Like(`%${name}%`) },
        relations: ['category'],
      });

      const data = response.map((item) => new ProductResponse(item));

      return {
        statusCode: HttpStatus.OK,
        message: 'Product retrieved successfully',
        data,
      };
    } catch (error) {
      console.log(error);

      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to retrieve Products',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: string,
    product: ProductUpdate,
    access_token: string,
  ): Promise<ApiResponse<ProductResponse>> {
    try {
      const payLoad = await this.jwtService.verifyAsync(access_token);
      const account = await this.usersRepository.findOne({
        where: { id: payLoad.id },
      });

      if (
        !account ||
        account.nonce !== payLoad.nonce ||
        account.role !== 'admin'
      ) {
        return {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'Unauthorized access',
          data: null,
        };
      }

      await this.productRepository.update(id, product);

      const response = await this.productRepository.findOne({
        where: { id },
        relations: ['category'],
      });

      if (!response)
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Product not found',
          data: null,
        };

      const data = new ProductResponse(response);

      return {
        statusCode: HttpStatus.OK,
        message: 'Product updated successfully',
        data,
      };
    } catch (error) {
      console.log(error);

      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to Update Product',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(
    id: string,
    access_token: string,
  ): Promise<ApiResponse<ProductResponse>> {
    try {
      const payLoad = await this.jwtService.verifyAsync(access_token);
      const account = await this.usersRepository.findOne({
        where: { id: payLoad.id },
      });

      if (
        !account ||
        account.nonce !== payLoad.nonce ||
        account.role !== 'admin'
      ) {
        return {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'Unauthorized access',
          data: null,
        };
      }

      const response = await this.productRepository.findOne({
        where: { id },
        relations: ['category'],
      });

      if (!response)
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Product not found',
          data: null,
        };

      await this.productRepository.delete(id);

      const data = new ProductResponse(response);

      return {
        statusCode: HttpStatus.OK,
        message: 'Product deleted successfully',
        data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to Delete Product',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
