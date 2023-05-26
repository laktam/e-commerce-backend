import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { UpdateProdDto } from './dto/update-product.dts';
import { Image } from './entities/image.entity';


@Injectable()
export class ProductService {

    constructor(@InjectRepository(Product) private productsRepo: Repository<Product>, @InjectRepository(Product) private imagesRepo: Repository<Image>,) { }

    async create(files: Array<Express.Multer.File>, product: Product) {

        const images = files.map((file) => {
            const image = new Image();
            image.name = file.originalname;
            image.content = file.buffer;
            return image;
        });
        product.images = images;
        console.log(product)
        await this.productsRepo.save(product)
        return product
    }

    async update(files: Array<Express.Multer.File>, product: Product) {

        const prd = await this.productsRepo.findOne({
            relations: ['images'],
            where: {
                id: product.id
            }
        })

        const images = files.map((file) => {
            const image = new Image();
            image.name = file.originalname;
            image.content = file.buffer;
            return image;
        });

        // product.images = images;
        // console.log(product)
        // console.log(prd)
        // console.log('**************************')
        if (images.length !== 0) {
            prd.images = images
        }
        prd.description = product.description
        prd.name = product.name
        prd.price = product.price
        prd.quantity = product.quantity
        await this.productsRepo.save(prd)
        console.log(prd)
        return prd
    }

    async del(productId: number) {
        const p = await this.productsRepo.findOneBy({
            id: productId,
        })

        await this.productsRepo.remove(p)
        return p
    }

    async findOne(productId: number) {
        const product = await this.productsRepo.findOne({
            relations: ['images'],
            where: {
                id: productId
            }
        }
        )
        return product

    }

    async findAll() {
        return await this.productsRepo.find({
            relations: ['images']
        })
        //decoding 
    }

    async productQuantity(productId: number) {
        const product = await this.productsRepo.findOneBy({
            id: productId,
        })
        return product.quantity
    }

    async updateProductQtt(prod: UpdateProdDto) {
        const product = await this.productsRepo.findOneBy({
            id: prod.productId,
        })
        product.quantity = prod.productQtt
        await this.productsRepo.save(product)
        return product
    }

    async findByCart(cart: Cart) {

        // return await this.productsRepo.find({
        //     relations: ['cart'],
        //     where: {
        //         cart: cart,
        //     }
        // })
    }

    async decrementProductQtt(productId: number) {
        const product = await this.productsRepo.findOneBy({
            id: productId,
        })
      
        product.quantity -= 1
        await this.productsRepo.save(product)
        return product.quantity
    }

    async incrementProductQtt(productId: number) {
        const product = await this.productsRepo.findOneBy({
            id: productId,
        })
        product.quantity += 1
        await this.productsRepo.save(product)
        return product.quantity
    }
}
