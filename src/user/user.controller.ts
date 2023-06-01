import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/auth/public.decorator';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    // @Public()
    // @ApiResponse({ status: 201, description: 'Return created user.' })
    // @ApiOperation({ summary: 'Create new user' })
    // @Post('create')
    // create(@Body() createUserDto: CreateUserDto) {
    //     return this.userService.create(createUserDto);
    // }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'add cart to user' })
    @Put('addCart')
    addCart(@Body() updateUserDto: UpdateUserDto) {
        return this.userService.addCart(updateUserDto.cartId, updateUserDto.userId)
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'get the cartId of the user' })
    @ApiParam({ name: 'userId', type: Number })
    @Get('cart/:userId')
    getCart(@Param('userId') userId: number) {
        return this.userService.getCart(userId)
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'total price of products in the cart of the user' })
    @ApiParam({ name: 'userId', type: Number })
    @Get('total/:userId')
    total(@Param('userId') userId) {
        return this.userService.total(userId)
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'get all users' })
    @Get('all')
    allUsers() {
        return this.userService.getAll()
    }
}
