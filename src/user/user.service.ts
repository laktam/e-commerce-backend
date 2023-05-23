import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';// 'src/User.entity';
import { Repository } from 'typeorm';
// import { Cart } from 'src/cart/entities/cart.entity';
import { CartService } from 'src/cart/cart.service';
import { LoginDto } from 'src/auth/dto/login.dto';

@Injectable()
export class UserService {
    //here i need to inject the cartService not the cartsRepo (@InjectRepository(Cart) private cartsRepo: Repository<Cart>)
    constructor(@InjectRepository(User) private usersRepo: Repository<User>,
        private cartService: CartService,
    ) { }

    async create(createUserDto: CreateUserDto) {
        const user = await this.usersRepo.findOne({
            relations: ['cart'],
            where: {
                name: createUserDto.name
            }
        })
        //check name
        if (user === null) {
            console.log(user);

            const u = new User(createUserDto.name, createUserDto.password, createUserDto.email)

            //create a cart and asign it to user
            u.cart = await this.cartService.create()
            
            await this.usersRepo.save(u);
            return u;
        } else {
            throw new HttpException('username used', HttpStatus.CONFLICT);
        }
    }

    async addCart(cartId: number, userId: number) {
        const user = await this.usersRepo.findOne({
            relations: ['cart'],
            where: {
                id: userId
            }
        })
        // const users = await this.usersRepo.find({
        //     relations: ['cart']
        // })
        //check if the cart is used
        //no need to do that we create a cart for the user every sign in and delete it on logout

        // if (user.cart !== null) {
        //     for (const u of users) {
        //         if (u.cart.id === cartId) {
        //             return 'cart used';
        //         }
        //     }
        // }
        user.cart = await this.cartService.findOneBy(cartId)
        this.usersRepo.save(user);
        return user;
    }

    async total(userId) {
        const u = await this.usersRepo.findOne({
            relations: ['cart'],
            where: {
                id: userId,
            }
        })
        return this.cartService.total(u.cart.id)
    }

    async findOne(loginDto: LoginDto) {
        return await this.usersRepo.findOne({
            relations: ['cart'],
            where: {
                name: loginDto.name,
                password: loginDto.password
            }
        })
    }

    async getCart(userId: number) {
        const user = await this.usersRepo.findOne({
            relations: ['cart'],
            where: {
                id: userId
            }
        })
        return user.cart.id
    }
}
