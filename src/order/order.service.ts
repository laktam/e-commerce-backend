import { Injectable } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { UpdateOrderInCartDto } from 'src/cart/dto/update-cart.dto';

@Injectable()
export class OrderService {
    constructor(@InjectRepository(Order) private ordersRepo: Repository<Order>) { }

    async findOneBy(orderId: number) {
        return await this.ordersRepo.findOne({
            relations: ['product'],
            where: {
                id: orderId,
            }
        })
    }

    async create(product: Product) {
        const order = new Order()
        order.product = product
        await this.ordersRepo.create(order)
        console.log('order created');
        return order;
    }

    // async update(product: Product) {
    //     const order = new Order()
    //     order.product = product
    //     await this.ordersRepo.create(order)
    //     console.log('order created');
    //     return order;
    // }



    async delOrder(orderId: number) {
        // const order = await this.ordersRepo.findOne({
        //     where: {
        //         id: orderId 
        //     }
        // })
        return await this.ordersRepo.delete(orderId);
        // return 'order deleted'
    }

    async decrementQtt(orderId: number) {
        const order = await this.ordersRepo.findOne({
            relations: ['product'],
            where: {
                id: orderId,
            }
        })
        order.quantity -= 1
        await this.ordersRepo.save(order)
        return order.quantity
    }

    async incrementQtt(orderId: number) {
        const order = await this.ordersRepo.findOne({
            relations: ['product'],
            where: {
                id: orderId,
            }
        })
        order.quantity += 1
        await this.ordersRepo.save(order)
        return order
    }

    async updateOrder(updateOrderInCartDto: UpdateOrderInCartDto) {
        const order = await this.ordersRepo.findOne({
            relations: ['product'],
            where: {
                id: updateOrderInCartDto.orderId
            }
        })
        order.quantity = updateOrderInCartDto.quantity
        await this.ordersRepo.save(order)
        return 'order updated'
    }


    async findAll() {
        return await this.ordersRepo.find({
            relations: ['product']
        })
    }

    findOne(id: number) {
        return `This action returns a #${id} order`;
    }



    remove(id: number) {
        return `This action removes a #${id} order`;
    }
}
