import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
    ) {
    }

    async signIn(loginDto: LoginDto) {
        const user = await this.userService.findOne(loginDto);

        if (user === null || user.password !== loginDto.password) {
            throw new UnauthorizedException();
        }

        const payload = { username: user.name, sub: user.id }
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

}
