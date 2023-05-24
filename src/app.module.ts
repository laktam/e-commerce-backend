import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart/entities/cart.entity';
import { User } from './user/entities/user.entity';
import { Product } from './product/entities/product.entity';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { OrderModule } from './order/order.module';
import { Order } from './order/entities/order.entity';
import { CardModule } from './card/card.module';
import { Card } from './card/entities/card.entity';
import { Image } from './product/entities/image.entity';

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123@abdo',
        database: 'tutorial',
        entities: [Product, Cart, User, Order, Card, Image],
        synchronize: true,
    })
        , UserModule
        , CartModule
        , ProductModule
        , AuthModule, OrderModule, CardModule

    ],
    controllers: [AppController],
    providers: [AppService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
    exports: [AppService],
})
export class AppModule { }
