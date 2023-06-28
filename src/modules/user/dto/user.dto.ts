import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { Message } from 'src/shared';

export class UserDto extends PartialType(CreateUserDto) {
  @Type(() => Number)
  @IsNumber({}, { message: Message.NUMBER('$property') })
  @ApiProperty({
    title: 'id',
    example: '1',
    required: true,
  })
  readonly id: number;
}
