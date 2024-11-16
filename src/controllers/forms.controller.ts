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
    @Headers('access_token') access_token: string,
  ): Promise<ApiResponse<FormsResponse[]>> {
    return this.formsService.findAll(access_token);
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

  @Delete()
  async delete(
    @Param('id') id: string,
    @Headers('access_token') access_token: string,
  ): Promise<ApiResponse<FormsResponse>> {
    return this.formsService.remove(id, access_token);
  }
}
