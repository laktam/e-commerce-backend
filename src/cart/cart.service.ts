import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { ProductService } from 'src/product/product.service';
import { OrderService } from 'src/order/order.service';
import { AddProductToCartDto, UpdateOrderInCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
    //i need to use the prodect service instead of productsRepo
    constructor(@InjectRepository(Cart) private cartsRepo: Repository<Cart>,
        private orderService: OrderService,
        private productService: ProductService) { }

    async create() {
        const c = new Cart()
        await this.cartsRepo.save(c)
        return c;
    }

    async delete(cartId: number) {
        const c = await this.cartsRepo.findOne({
            relations: {
                orders: {
                    product: true
                }
            },
            where: {
                id: cartId,
            }
        })
        await this.cartsRepo.remove(c)
        return c;
    }

    //product added as an order
    async addProduct(addProductToCartDto: AddProductToCartDto) {

        const cart = await this.cartsRepo.findOne({
            relations: {
                orders: {
                    product: true
                }
            },
            where: {
                id: addProductToCartDto.cartId
            }
        })

        //get product to see if qtt is > 0
        const product = await this.productService.findOne(addProductToCartDto.productId)
        if (product.quantity > 0) {

            //if product exist in cart increment order qtt
            for (let o of cart.orders) {
                if (o.product.id === addProductToCartDto.productId) {
                    //increment order qtt
                    this.orderService.incrementQtt(o.id)
                    //increment cart qtt
                    cart.quantity += 1
                    await this.cartsRepo.save(cart)
                    //decrement product qtt
                    return await this.productService.decrementProductQtt(addProductToCartDto.productId) //<--- this retunr prod qtt
                }
            }

            //else add the product as order
            //creating order
            const order = await this.orderService.create(product)
            //adding order to cart
            cart.orders.push(order)
            //incrementing cart qtt 
            cart.quantity += 1

            console.log(cart.quantity)//<<-------------------------||||||||||||||||||||||||||||
            await this.cartsRepo.save(cart)
            //decrement product qtt
            return await this.productService.decrementProductQtt(addProductToCartDto.productId)
        }
        //else if prod qtt is 0
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        // return 0
        // return cart
    }

    //check if order > 1 , decrement it, else delete it
    async delOrder(cartId: number, orderId: number) {
        const cart = await this.cartsRepo.findOne({
            relations: {
                orders: {
                    product: true
                }
            },
            where: {
                id: cartId
            }
        })

        //finding order
        const order = await this.orderService.findOneBy(orderId)

        if (order.quantity > 1) {
            //decrement cart qtt
            cart.quantity -= 1
            await this.cartsRepo.save(cart)
            await this.productService.incrementProductQtt(order.product.id)
            return await this.orderService.decrementQtt(orderId)

        } else {
            // if last order
            //delete the order object from the cart
            cart.orders = cart.orders.filter(order => { return order.id != orderId })
            cart.quantity -= 1
            await this.cartsRepo.save(cart)
            //deleting the order object
            await this.orderService.delOrder(orderId)
            await this.productService.incrementProductQtt(order.product.id)
            return 0
        }
    }

    async total(cartId: number) {
        let total = 0;
        const cart = await this.cartsRepo.findOne({
            relations: {
                orders: {
                    product: true
                }
            },
            where: {
                id: cartId,
            }
        })

        for (const order of cart.orders) {
            total += (order.quantity * order.product.price)
        }
        return total
    }

    async findOneBy(cartId: number) {
        return await this.cartsRepo.findOneBy({
            id: cartId,
        })
    }

    async findByCart(cartId: number) {
        //find the cart 
        const cart = await this.cartsRepo.findOne(
            {
                relations: {
                    orders: {
                        product: {
                            images: true,
                        }
                    }
                },
                where: {
                    id: cartId,
                }
            })
        return cart.orders


    }

    async updateOrder(updateOrderInCartDto: UpdateOrderInCartDto) {
        return this.orderService.updateOrder(updateOrderInCartDto)
    }

}
