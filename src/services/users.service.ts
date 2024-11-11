import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { UsersCreate, UsersResponse, UsersUpdate } from 'src/dto/users.dto';
import { JwtService } from '@nestjs/jwt';
import { createCipheriv, randomBytes, createDecipheriv } from 'crypto';
import { ApiResponse } from 'src/common/interfaces/response.interface';

const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.CRYPTO_SECRET_KEY, 'hex');
const iv = randomBytes(16);

function encrypt(text: string) {
  let cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text: string) {
  let textParts = text.split(':');
  let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(textParts.join(':'), 'hex');
  let decipher = createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async signup(user: UsersCreate): Promise<ApiResponse<UsersResponse>> {
    try {
      user.password = encrypt(user.password);
      const response = await this.usersRepository.save(user);
      const data = new UsersResponse(response);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'User signed up successfully',
        data,
      };
    } catch (error) {
      console.error(error);
      var message: String = error.message || 'Signup Failed';
      if (message.includes('duplicate key value violates unique constraint')) {
        message = 'Email already exists';
      }
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async signin(
    email: string,
    password: string,
  ): Promise<ApiResponse<{ access_token: string }>> {
    try {
      const response = await this.usersRepository.findOne({ where: { email } });
      if (!response || decrypt(response.password) !== password) {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid credentials',
          data: null,
        };
      }

      const accessToken = await this.jwtService.signAsync({
        id: response.id,
        role: response.role,
        nonce: response.nonce,
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Sign-in successful',
        data: { access_token: accessToken },
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Signin failed',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(access_token: string): Promise<ApiResponse<UsersResponse[]>> {
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

      const response = await this.usersRepository.find();
      const data = response.map((user) => new UsersResponse(user));

      return {
        statusCode: HttpStatus.OK,
        message: 'Users retrieved successfully',
        data,
      };
    } catch (error) {
      console.error(error.response);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to retrieve users',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(
    id: string,
    access_token: string,
  ): Promise<ApiResponse<UsersResponse>> {
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

      const response = await this.usersRepository.findOne({ where: { id } });

      if (!response)
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User not found',
          data: null,
        };

      const data = new UsersResponse(response);

      return {
        statusCode: HttpStatus.OK,
        message: 'User retrieved successfully',
        data,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to retrieve user',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAccount(token: string): Promise<ApiResponse<UsersResponse>> {
    try {
      const payLoad = await this.jwtService.verifyAsync(token);

      const response = await this.usersRepository.findOne({
        where: { id: payLoad.id },
      });

      if (!response)
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Account not found',
          data: null,
        };

      const data = new UsersResponse(response);

      return {
        statusCode: HttpStatus.OK,
        message: 'Account retrieved successfully',
        data,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to retrieve account',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: string,
    user: UsersUpdate,
    access_token: string,
  ): Promise<ApiResponse<UsersResponse>> {
    try {
      const payLoad = await this.jwtService.verifyAsync(access_token);

      const account = await this.usersRepository.findOne({
        where: { id: payLoad.id },
      });

      if (payLoad.id !== id && (!account || account.role !== 'admin')) {
        return {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'Unauthorized access',
          data: null,
        };
      }

      if (account.nonce !== payLoad.nonce) {
        return {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'Invalid nonce',
          data: null,
        };
      }

      if (user.password) {
        user.password = encrypt(user.password);
      }

      await this.usersRepository.update(id, user);

      const response = await this.usersRepository.findOne({ where: { id } });

      if (!response)
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User not found',
          data: null,
        };

      const data = new UsersResponse(response);

      return {
        statusCode: HttpStatus.OK,
        message: 'User updated successfully',
        data,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to update user',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(
    id: string,
    access_token: string,
  ): Promise<ApiResponse<UsersResponse>> {
    try {
      const payLoad = await this.jwtService.verifyAsync(access_token);

      const account = await this.usersRepository.findOne({
        where: { id: payLoad.id },
      });

      if (payLoad.id !== id && (!account || account.role !== 'admin')) {
        return {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'Unauthorized access',
          data: null,
        };
      }

      const response = await this.usersRepository.findOne({ where: { id } });

      if (!response)
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User not found',
          data: null,
        };

      await this.usersRepository.delete(id);

      const data = new UsersResponse(response);

      return {
        statusCode: HttpStatus.OK,
        message: 'User deleted successfully',
        data,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Failed to delete user',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
