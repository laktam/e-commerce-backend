import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { UpdateProdDto } from './dto/update-product.dts';
import { Image } from './entities/image.entity';
import { FEProduct } from './entities/product.frontend';
import { FEImage } from './entities/image.frontend';
import { Buffer } from 'buffer';


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


    async FEfindOne(productId: number) {
        const product = await this.productsRepo.findOne({
            relations: ['images'],
            where: {
                id: productId
            }
        }
        )

        let feproduct = new FEProduct()
        feproduct.id = product.id
        feproduct.description = product.description
        feproduct.name = product.name
        feproduct.price = product.price
        feproduct.quantity = product.quantity
        const images: FEImage[] = []

        console.log(product.images)
        for (let image of product.images) {
            let feimage = new FEImage()
            feimage.content = Buffer.from(image.content).toString('base64')
            images.push(feimage)
        }
        console.log(images)
        feproduct.images = images
        return feproduct

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
        const products = await this.productsRepo.find({
            relations: ['images']
        })
        //images to base64
        const feProducts = []
        for (let product of products) {
            let feproduct = new FEProduct()
            feproduct.id = product.id
            feproduct.description = product.description
            feproduct.name = product.name
            feproduct.price = product.price
            feproduct.quantity = product.quantity
            const images: FEImage[] = []
            let feimage = new FEImage()
            for (let image of product.images) {
                feimage.content = Buffer.from(image.content).toString('base64')
                images.push(feimage)
            }
            feproduct.images = images
            feProducts.push(feproduct)
        }
        return feProducts
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
