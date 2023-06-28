import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CRUDMessages } from 'src/shared';
import {
  ResUserAddInterface,
  ResUserDeleteInterface,
  ResUserEditInterface,
  ResUserFindInterface,
  ResUserFindOneInterface,
} from './interface/user.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { PaginationUserDto } from './dto/pagination-user.dto';
import { PaginatedResponse } from './interface/user.interface';
@ApiCreatedResponse()
@ApiTags('Usuario')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: 'ver usuarios paginados' })
  @ApiResponse({
    status: 200,
    description: CRUDMessages.GetDescription,
    type: ResUserFindInterface,
  })
  @Get('paginate')
  async findAlls(@Query() pagination: PaginationUserDto) {
    return this.userService.findAllPaginated(pagination);
  }
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso' })
  @Patch('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @ApiOperation({ summary: CRUDMessages.Create })
  @ApiResponse({
    status: 200,
    description: CRUDMessages.CreateDescription,
    type: ResUserAddInterface,
  })
  @ApiBody({ type: CreateUserDto })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: CRUDMessages.Get })
  @ApiResponse({
    status: 200,
    description: CRUDMessages.GetDescription,
    type: ResUserFindInterface,
  })
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: CRUDMessages.Get })
  @ApiResponse({
    status: 200,
    description: CRUDMessages.GetDescription,
    type: ResUserFindOneInterface,
  })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({ summary: CRUDMessages.Update })
  @ApiParam({
    name: 'id',
    description: 'Identificador',
    type: Number,
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: CRUDMessages.UpdateDescription,
    type: ResUserEditInterface,
  })
  @ApiBody({ type: CreateUserDto })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: CreateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: CRUDMessages.Delete })
  @ApiParam({
    name: 'id',
    description: 'Identificador',
    type: Number,
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: CRUDMessages.DeleteDescription,
    type: ResUserDeleteInterface,
  })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(+id);
  }


}
