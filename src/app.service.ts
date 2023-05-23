import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Product } from './Product.entity';
// import { Repository } from 'typeorm';
// import { User } from './User.entity';
// import { Cart } from './Cart.entity';

@Injectable()
export class AppService {

    getHello(): string {
        return 'Hello World!';
    }


}
