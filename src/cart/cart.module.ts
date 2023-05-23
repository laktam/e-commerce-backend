import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './entities/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { ProductModule } from 'src/product/product.module';
import { OrderModule } from 'src/order/order.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Cart])
        , TypeOrmModule.forFeature([Product])
        , ProductModule
        , OrderModule
    ],
    controllers: [CartController],
    providers: [CartService],
    exports: [CartService]
})
export class CartModule { }
