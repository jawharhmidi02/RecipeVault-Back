import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Headers,
  UseInterceptors,
  UploadedFile,
  Put,
  Query,
} from '@nestjs/common';
import { FormsCreate } from 'src/dto/forms.dto';
import { FormsResponse } from 'src/dto/forms.dto';
import { FormsService } from 'src/services/forms.service';
import { ApiResponse } from 'src/common/interfaces/response.interface';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() data: FormsCreate,
    @Headers('access_token') access_token: string,
    @UploadedFile('file') file: any,
  ): Promise<ApiResponse<FormsResponse>> {
    return this.formsService.create(data, file, access_token);
  }

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Headers('access_token') access_token: string,
  ): Promise<
    ApiResponse<{
      data: FormsResponse[];
      totalPages: number;
      currentPage: number;
      totalItems: number;
    }>
  > {
    return this.formsService.findAll(page, limit, access_token);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Headers('access_token') access_token: string,
  ): Promise<ApiResponse<FormsResponse>> {
    return this.formsService.findOne(id, access_token);
  }

  @Get('/user/:id')
  async findByUserID(
    @Param('id') id: string,
    @Headers('access_token') access_token: string,
  ): Promise<ApiResponse<FormsResponse[]>> {
    return this.formsService.findByUserID(id, access_token);
  }

  @Put(':id')
  async Accept(
    @Param('id') id: string,
    @Headers('access_token') access_token: string,
  ): Promise<ApiResponse<FormsResponse>> {
    return this.formsService.accept(id, access_token);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Headers('access_token') access_token: string,
  ): Promise<ApiResponse<FormsResponse>> {
    return this.formsService.reject(id, access_token);
  }
}
