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
import { Category } from './entities/category.entity';


@Injectable()
export class ProductService {

    constructor(@InjectRepository(Product) private productsRepo: Repository<Product>,
        @InjectRepository(Product) private imagesRepo: Repository<Image>,
        @InjectRepository(Category) private categoriesRepo: Repository<Category>
    ) { }

    async create(files: Array<Express.Multer.File>, product: Product, cat: string) {

        const images = files.map((file) => {
            const image = new Image();
            image.name = file.originalname;
            image.content = file.buffer;
            return image;
        });
        const category = await this.categoriesRepo.findOne({
            relations: ['products'],
            where: {
                name: cat,
            }
        })
        product.category = category
        product.images = images;
        console.log(product)
        await this.productsRepo.save(product)
        return product
    }

    async findByName(productName: string) {
        const products = await this.productsRepo.find({
            relations: ['images']
        })
        const results = products.filter(
            (product) => {
                return product.name.toLowerCase().includes(productName.toLowerCase())
            })

        //to base64 encoding
        return this.encodeProducts(results)
    }

    async update(files: Array<Express.Multer.File>, product: Product, cat: string) {

        const prd = await this.productsRepo.findOne({
            relations: ['images', 'category'],
            where: {
                id: product.id
            }
        })

        const category = await this.categoriesRepo.findOne({
            relations: ['products'],
            where: {
                name: cat
            }
        }
        )

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
        prd.category = category
        await this.productsRepo.save(prd)
        return prd
    }

    async del(productId: number) {
        const p = await this.productsRepo.findOneBy({
            id: productId,
        })

        await this.productsRepo.remove(p)
        return p
    }


    async allCategories() {
        const categories = await this.categoriesRepo.find({
            relations: {
                products: {
                    images: true,
                }
            },
        })
        const cats: Category[] = []
        for (let cat of categories) {
            cat.products = this.encodeProducts(cat.products)
            cats.push(cat)
        }
        return cats
    }

    async findByCategory(categoryName: string) {
        const category = await this.categoriesRepo.findOne({
            relations: {
                products: {
                    images: true,
                }
            },
            where: {
                name: categoryName,
            }
        })
        category.products = this.encodeProducts(category.products)
        return category
    }



    async FEfindOne(productId: number) {
        const product = await this.productsRepo.findOne({
            relations: ['images', 'category'],//<------------------------------------------------||
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
        feproduct.category = product.category
        const images: FEImage[] = []

        for (let image of product.images) {
            let feimage = new FEImage()
            feimage.content = Buffer.from(image.content).toString('base64')
            images.push(feimage)
        }
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

    async addCategory(categoryName: string) {
        const cat = new Category()
        cat.name = categoryName
        return await this.categoriesRepo.save(cat)
    }

    //doesn't return images
    async findAll() {
        const products = await this.productsRepo.find({
            // relations: ['images']
        })
        //images to base64
        // const feProducts = []
        // for (let product of products) {
        //     let feproduct = new FEProduct()
        //     feproduct.id = product.id
        //     feproduct.description = product.description
        //     feproduct.name = product.name
        //     feproduct.price = product.price
        //     feproduct.quantity = product.quantity
        //     const images: FEImage[] = []
        //     let feimage = new FEImage()
        //     for (let image of product.images) {
        //         feimage.content = Buffer.from(image.content).toString('base64')
        //         images.push(feimage)
        //     }
        //     feproduct.images = images
        //     feProducts.push(feproduct)
        // }
        return products
        // return this.encodeProducts(products)
    }

    encodeProducts(products: Product[]) {
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

    //this returns strings
    async getCategories() {
        const names = []
        const categories = await this.categoriesRepo.find()
        for (let category of categories) {
            names.push(category.name)
        }
        return names
    }
}
