import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Forms } from 'src/entities/forms.entity';
import { FormsCreate } from 'src/dto/forms.dto';
import { ApiResponse } from 'src/common/interfaces/response.interface';
import { Users } from 'src/entities/users.entity';
import { FormsResponse } from 'src/dto/forms.dto';
import { JwtService } from '@nestjs/jwt';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Forms)
    private formsRepository: Repository<Forms>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async create(
    data: FormsCreate,
    file: any,
    access_token: string,
  ): Promise<ApiResponse<FormsResponse>> {
    try {
      const payLoad = await this.jwtService.verifyAsync(access_token);

      if (!payLoad) {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized access',
          data: null,
        };
      }

      const user = await this.usersRepository.findOne({
        where: { id: payLoad.id },
      });

      if (!user || user.role !== 'client') {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized access',
          data: null,
        };
      }

      let fileName = new Date().getTime() + file.originalname;
      console.log('file');
      console.log(file);

      const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_API_KEY,
      );

      const { error } = await supabase.storage
        .from('pdfs')
        .upload(fileName, file.buffer, {
          contentType: 'application/pdf',
        });
      if (error) throw error;

      const URL = supabase.storage.from('pdfs').getPublicUrl(fileName);

      const form = this.formsRepository.create({
        ...data,
        user,
        cv_pdf: URL.data.publicUrl,
      });

      const savedForm = await this.formsRepository.save(form);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Form created successfully',
        data: new FormsResponse(savedForm),
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message || 'Failed to create Form',
        data: null,
      };
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    access_token: string,
  ): Promise<
    ApiResponse<{
      data: FormsResponse[];
      totalPages: number;
      currentPage: number;
      totalItems: number;
    }>
  > {
    try {
      const payLoad = await this.jwtService.verifyAsync(access_token);

      if (!payLoad) {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized access',
          data: null,
        };
      }
      const userTest = await this.usersRepository.findOne({
        where: { id: payLoad.id },
      });
      if (!userTest) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User not found',
          data: null,
        };
      }
      if (userTest.role !== 'admin') {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized access',
          data: null,
        };
      }

      const [response, totalItems] = await this.formsRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        relations: ['user'],
      });

      const data = response.map((form) => new FormsResponse(form));

      return {
        statusCode: HttpStatus.OK,
        message: 'Forms retrieved successfully',
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
        'Failed to retrieve Forms',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(
    id: string,
    access_token: string,
  ): Promise<ApiResponse<FormsResponse>> {
    try {
      const payLoad = await this.jwtService.verifyAsync(access_token);

      if (!payLoad) {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized access',
          data: null,
        };
      }
      const userTest = await this.usersRepository.findOne({
        where: { id: payLoad.id },
      });
      if (!userTest) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User not found',
          data: null,
        };
      }
      if (userTest.role !== 'admin') {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized access',
          data: null,
        };
      }
      const form = await this.formsRepository.findOne({
        where: { id },
        relations: ['user'],
      });

      if (!form) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Form not found',
          data: null,
        };
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Form retrieved successfully',
        data: new FormsResponse(form),
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to retrieve Form',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByUserID(
    id: string,
    access_token: string,
  ): Promise<ApiResponse<FormsResponse[]>> {
    try {
      const payLoad = await this.jwtService.verifyAsync(access_token);

      if (!payLoad) {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized access',
          data: null,
        };
      }
      const userTest = await this.usersRepository.findOne({
        where: { id: payLoad.id },
      });
      if (!userTest) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User not found',
          data: null,
        };
      }
      if (userTest.role !== 'admin') {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized access',
          data: null,
        };
      }
      const form = await this.formsRepository.find({
        where: { user: { id } },
        relations: ['user'],
      });

      if (!form) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Form not found',
          data: null,
        };
      }

      const data = form.map((like) => new FormsResponse(like));

      return {
        statusCode: HttpStatus.OK,
        message: 'Forms Of User retrieved successfully',
        data,
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to retrieve Forms',
        data: null,
      };
    }
  }

  async accept(
    id: string,
    access_token: string,
  ): Promise<ApiResponse<FormsResponse>> {
    try {
      const payLoad = await this.jwtService.verifyAsync(access_token);

      if (!payLoad) {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized access',
          data: null,
        };
      }
      const userTest = await this.usersRepository.findOne({
        where: { id: payLoad.id },
      });
      if (!userTest) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User not found',
          data: null,
        };
      }
      if (userTest.role !== 'admin') {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized access',
          data: null,
        };
      }
      const form = await this.formsRepository.findOne({
        where: { id },
        relations: ['user'],
      });

      if (!form) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Form not found',
          data: null,
        };
      }

      await this.usersRepository.update(
        { id: form.user.id },
        { role: 'specialist' },
      );
      await this.formsRepository.remove(form);

      return {
        statusCode: HttpStatus.OK,
        message: 'Form deleted successfully',
        data: new FormsResponse(form),
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to delete Form',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async reject(
    id: string,
    access_token: string,
  ): Promise<ApiResponse<FormsResponse>> {
    try {
      const payLoad = await this.jwtService.verifyAsync(access_token);

      if (!payLoad) {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized access',
          data: null,
        };
      }
      const userTest = await this.usersRepository.findOne({
        where: { id: payLoad.id },
      });
      if (!userTest) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User not found',
          data: null,
        };
      }
      if (userTest.role !== 'admin') {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized access',
          data: null,
        };
      }
      const form = await this.formsRepository.findOne({
        where: { id },
        relations: ['user'],
      });

      if (!form) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Form not found',
          data: null,
        };
      }

      await this.formsRepository.remove(form);

      return {
        statusCode: HttpStatus.OK,
        message: 'Form deleted successfully',
        data: new FormsResponse(form),
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to delete Form',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

// import { Stream } from 'stream';
// import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
// import { Dropbox } from 'dropbox';

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const uploadResult = await new Promise<UploadApiResponse>(
//   (resolve, reject) => {
//     cloudinary.uploader
//       .upload_stream({ folder: 'recipevault' }, (error, result) => {
//         if (error) return reject(error);
//         resolve(result);
//       })
//       .end(file.buffer);
//   },
// );
// console.log('uploadResult');
// console.log(uploadResult);

// const form = this.formsRepository.create({
//   ...data,
//   user,
//   cv_pdf: uploadResult.secure_url,
// });
// const savedForm = await this.formsRepository.save(form);

// const dbx = new Dropbox({
//   accessToken:
//     process.env.DROPBOX_ACCESS_TOKEN,
// });

// console.log(file);
// let savedForm;
// await dbx
//   .filesUpload({
//     path: `/pdfs/${new Date().getTime()}.pdf`,
//     contents: file,
//   })
//   .then(async (response) => {
//     console.log('File uploaded successfully:', response);

//     // Now, get the temporary download link for the uploaded file
//     const tempLinkResponse = await dbx.filesGetTemporaryLink({
//       path: response.result.path_display,
//     });

//     console.log('Temporary download URL:', tempLinkResponse.result.link);

//     const uploadResult = {
//       secure_url: tempLinkResponse.result.link, // This is the download link
//     };

//     console.log('Upload Result:', uploadResult);

//     const form = this.formsRepository.create({
//       ...data,
//       user,
//       cv_pdf: uploadResult.secure_url,
//     });
//     savedForm = await this.formsRepository.save(form);
//   })
//   .catch((error) => {
//     console.error('Error uploading file:', error);
//     throw new HttpException(
//       'Failed to upload file',
//       HttpStatus.INTERNAL_SERVER_ERROR,
//     );
//   });
