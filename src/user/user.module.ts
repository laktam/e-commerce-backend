import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from 'src/cart/cart.module';

@Module({
    //this need to use the cartService not import 'TypeOrmModule.forFeature([Cart])'

    //forFeature() method to define which repositories are registered in the current scope.
    //With that in place, we can inject the UsersRepository into the UsersService using the @InjectRepository()
    imports: [TypeOrmModule.forFeature([User]), CartModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule { }
