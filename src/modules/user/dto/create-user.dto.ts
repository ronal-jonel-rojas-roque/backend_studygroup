import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Message } from 'src/shared';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @Type(() => String)
  @IsString({ message: Message.STRING('$property') })
  @ApiProperty({
    title: 'username',
    example: 'edwin1234',
    required: true,
  })
  readonly username: string;

  @Type(() => String)
  @IsString({ message: Message.STRING('$property') })
  @ApiProperty({
    title: 'password',
    example: '12345',
    required: true,
  })
  readonly password: string;


}
