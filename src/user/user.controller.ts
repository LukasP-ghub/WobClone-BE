import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { UserObj } from '../decorators/user-obj.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created', type: User })
  create(@Body() register: RegisterDto) {
    return this.userService.register(register);
  }

  @Get()
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'Retrieve all users (Admin only)' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'List of users', type: [User] })
  findAll() {
    // return this.userService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'Retrieve a user by ID (Admin only)' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'User ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 200, description: 'User found', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: string) {
    // return this.userService.findOne(+id);
  }

  @Patch('/update')
  @Roles('user')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'Update user data (Authenticated user only)' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'User successfully updated', type: User })
  @ApiResponse({ status: 400, description: 'Bad request' })
  update(@Body() updateUserDto: UpdateUserDto, @UserObj() user: User) {
    return this.userService.update(user, updateUserDto);
  }

  @Delete('/remove')
  @Roles('user')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'Delete user account (Authenticated user only)' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'User successfully deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(@UserObj() user: User) {
    return this.userService.remove(user);
  }
}
