import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  ResAddInterface,
  ResDeleteInterface,
  ResEditInterface,
  ResFindInterface,
} from 'src/core';
import { UserEntity } from 'src/infrastructure';
import { CRUDMessages } from 'src/shared';

const dataExample = { id: 1, name: 'edwin', age: 24, phone: 934876433 };

export class ResUserFindInterface extends ResFindInterface {
  @ApiProperty({
    title: CRUDMessages.GetSuccess,
    example: [dataExample],
    required: true,
  })
  readonly data: [];
}

export class ResUserFindOneInterface extends ResFindInterface {
  @ApiProperty({
    title: CRUDMessages.GetSuccess,
    example: dataExample,
    required: true,
  })
  readonly data: [];
}

export class ResUserAddInterface extends ResAddInterface {
  @ApiProperty({
    title: CRUDMessages.CreateSuccess,
    example: dataExample,
    required: true,
  })
  readonly data: [];
}

export class ResUserEditInterface extends ResEditInterface {
  @ApiProperty({
    title: CRUDMessages.UpdateSuccess,
    example: dataExample,
    required: true,
  })
  readonly data: [];
}

export class ResUserDeleteInterface extends ResDeleteInterface {
  @ApiProperty({
    title: CRUDMessages.DeleteSuccess,
    example: dataExample,
    required: true,
  })
  readonly data: [];
}

export class PaginatedResponse{
  statusCode: HttpStatus;
  message: CRUDMessages;
  data: UserEntity[];
  count: number;
  total: number;
  page?: number;
  totalPages?: number;
}