import { ApiProperty } from '@nestjs/swagger';
import { CRUDMessages } from 'src/shared';

export class ResFindInterface {
  @ApiProperty({
    title: CRUDMessages.titleStatus,
    example: 200,
    required: true,
  })
  readonly statusCode: number;
  @ApiProperty({ title: CRUDMessages.titleCount, example: 1, required: true })
  readonly count?: number;
  @ApiProperty({
    title: CRUDMessages.titleMsg,
    example: CRUDMessages.GetSuccess,
    required: true,
  })
  readonly message: string;
}

export class ResAddInterface {
  @ApiProperty({
    title: CRUDMessages.titleStatus,
    example: 200,
    required: true,
  })
  readonly statusCode: number;
  @ApiProperty({ title: CRUDMessages.titleCount, example: 1, required: true })
  readonly count?: number;
  @ApiProperty({
    title: CRUDMessages.titleMsg,
    example: CRUDMessages.CreateSuccess,
    required: true,
  })
  readonly message: string;
}

export class ResEditInterface {
  @ApiProperty({
    title: CRUDMessages.titleStatus,
    example: 200,
    required: true,
  })
  readonly statusCode: number;
  @ApiProperty({ title: CRUDMessages.titleCount, example: 1, required: true })
  readonly count?: number;
  @ApiProperty({
    title: CRUDMessages.titleMsg,
    example: CRUDMessages.UpdateSuccess,
    required: true,
  })
  readonly message: string;
}

export class ResDeleteInterface {
  @ApiProperty({
    title: CRUDMessages.titleStatus,
    example: 200,
    required: true,
  })
  readonly statusCode: number;
  @ApiProperty({ title: CRUDMessages.titleCount, example: 1, required: true })
  readonly count?: number;
  @ApiProperty({
    title: CRUDMessages.titleMsg,
    example: CRUDMessages.DeleteSuccess,
    required: true,
  })
  readonly message: string;
}
