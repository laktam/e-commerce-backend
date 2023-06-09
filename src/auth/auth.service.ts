import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
    ) {
    }

    async signIn(loginDto: LoginDto) {



        // later


        const user = await this.userService.findOne(loginDto);



        if (user === null) {

            throw new UnauthorizedException();
        } else {
            const isMatch = await bcrypt.compare(loginDto.password, user.password);
            if (!isMatch) {
                throw new UnauthorizedException();
            }
        }

        const payload = { username: user.name, sub: user.id }
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

}
