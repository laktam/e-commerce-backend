import { Request, Body, Controller, Get, Post, UseGuards, ExecutionContext } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/auth/dto/login.dto';
import { AuthGuard } from './auth.guard';
import { Public } from 'src/auth/public.decorator';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authservice: AuthService, private userServive: UserService) { }
    // @Post('login')
    // signIn(@Body() dto: SignInUser) {
    //     return this.authservice.signIn(dto.name, dto.password)
    // }
    @Public()
    @ApiOperation({ summary: 'login' })
    @ApiResponse({ status: 201, description: 'Return created user.' })
    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authservice.signIn(loginDto)
    }

    @Public()
    @ApiOperation({ summary: 'sign up' })
    @Post('sign-up')
    signUp(@Body() createUserDto: CreateUserDto){
        return this.userServive.create(createUserDto);
    }



    @ApiBearerAuth()
    @ApiOperation({ summary: 'return the authenticated user' })
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
