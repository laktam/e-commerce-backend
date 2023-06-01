import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Category } from './entities/category.entity';
import { Comment } from './entities/comment.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([Product]), TypeOrmModule.forFeature([Image]),TypeOrmModule.forFeature([Category]),TypeOrmModule.forFeature([Comment])
    ],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService]
})
export class ProductModule { }
