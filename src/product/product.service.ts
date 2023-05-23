import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { UpdateProdDto } from './dto/update-product.dts';

@Injectable()
export class ProductService {

    constructor(@InjectRepository(Product) private productsRepo: Repository<Product>,) { }

    async create(createProductDto: ProductDto) {
        const p = new Product()
        p.name = createProductDto.name
        p.price = createProductDto.price
        await this.productsRepo.save(p)
        return p;
    }

    async del(productId: number) {
        const p = await this.productsRepo.findOneBy({
            id: productId,
        })

        await this.productsRepo.remove(p)
        return p
    }

    async findOne(productId: number) {
        return await this.productsRepo.findOneBy({
            id: productId,
        }
        )
    }

    async findAll() {
        return await this.productsRepo.find()
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
        //added <------------------------------------------------
        // if(product.quantity === 0){
        //     return 0
        // }
        //added <------------------------------------------------
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
