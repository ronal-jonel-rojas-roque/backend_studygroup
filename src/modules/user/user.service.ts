import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/infrastructure';
import { CRUDMessages } from 'src/shared';
import { LoginUserDto } from './dto/login-user.dto';
import { validate } from 'class-validator';
import { PaginationUserDto } from './dto/pagination-user.dto';
import { PaginatedResponse } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) { }

  async login(loginUserDto: LoginUserDto) {
   
  }

  async create(createUserDto: CreateUserDto) {
    try {
      // Validar los campos requeridos
      const errors = await validate(createUserDto);
      if (errors.length > 0) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Datos de usuario inválidos',
          data: errors,
          count: 0,
        };
      }
      const dataUser = this.userEntity.create(createUserDto);
      await this.userEntity.save(dataUser);
      return {
        statusCode: HttpStatus.OK,
        message: CRUDMessages.CreateSuccess,
        data: dataUser,
        count: 1,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        data: [],
        count: 0,
      };
    }
  }

  async findAll() {
    try {
      const ExistUser = await this.userEntity.find();
      if (ExistUser.length === 0) {
        return {
          statusCode: HttpStatus.OK,
          message: CRUDMessages.GetNotfound,
          data: ExistUser,
          count: ExistUser.length,
        };
      }
      return {
        statusCode: HttpStatus.OK,
        message: CRUDMessages.GetSuccess,
        data: ExistUser,
        count: ExistUser.length,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        data: [],
        count: 0,
      };
    }
  }

  async findOne(id: number) {
    try {
      const ExistUser = await this.userEntity.findOne({ where: { id } });
      if (!ExistUser) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: CRUDMessages.GetError,
          data: ExistUser,
          count: null,
        };
      }
      return {
        statusCode: HttpStatus.OK,
        message: CRUDMessages.GetSuccess,
        data: ExistUser,
        count: 1,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        data: [],
        count: 0,
      };
    }
  }

  async update(id: number, updateUserDto: CreateUserDto) {
    try {
      const ExistUser = await this.userEntity.findOne({ where: { id } });
      if (!ExistUser) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: CRUDMessages.UpdateError,
          data: ExistUser,
          count: null,
        };
      }
      await this.userEntity.update(id, updateUserDto);
      return {
        statusCode: HttpStatus.OK,
        message: CRUDMessages.UpdateSuccess,
        data: updateUserDto,
        count: 1,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        data: [],
        count: 0,
      };
    }
  }

  async remove(id: number) {
    try {
      const ExistUser = await this.userEntity.findOne({ where: { id } });
      if (!ExistUser) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: CRUDMessages.DeleteError,
          data: ExistUser,
          count: null,
        };
      }
      await this.userEntity.delete(id);
      return {
        statusCode: HttpStatus.OK,
        message: CRUDMessages.DeleteSuccess,
        data: ExistUser,
        count: 1,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        data: [],
        count: 0,
      };
    }
  }

  //paginacion
  async findAllPaginated({ limit, page }: PaginationUserDto) {
    try {
      const query = this.userEntity.createQueryBuilder('u')
        .take(limit || 10)
        .skip((page - 1) * limit || 0)
      const [result, total] = await query.getManyAndCount()

      return {
        statusCode: HttpStatus.OK,
        message: CRUDMessages.GetSuccess,
        data: result,
        count: total,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
