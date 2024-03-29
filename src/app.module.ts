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
import { Category } from './product/entities/category.entity';
import { Comment } from './product/entities/comment.entity';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
    imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: process.env.DATABASE_URL,
        port: 3306,
        username: 'root',
        password: '123@abdo',
        database: 'tutorial',
        entities: [Product, Cart, User, Order, Card, Image, Category, Comment],
        synchronize: true,
    })
        , UserModule
        , CartModule
        , ProductModule
        , AuthModule, OrderModule, CardModule,
    ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', 'build'),
        serveRoot: '/',
    })

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
