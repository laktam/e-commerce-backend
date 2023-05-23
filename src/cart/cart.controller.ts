import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CartService } from './cart.service';

import { ProductService } from 'src/product/product.service';
import { ApiBearerAuth, ApiExcludeController, ApiExcludeEndpoint, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AddProductToCartDto, UpdateOrderInCartDto } from './dto/update-cart.dto';

@ApiBearerAuth()
@ApiTags('Cart')
@Controller('cart')
export class CartController {
    constructor(
        private readonly cartService: CartService
        , private readonly productService: ProductService
    ) { }

    @ApiOperation({ summary: 'Create new cart' })
    @Post('create')
    create() {
        return this.cartService.create();
    }

    @ApiOperation({ summary: 'Create new cart' })
    @Delete('delete/:cartId')
    delete(@Param('cartId') cartId: number) {
        return this.cartService.delete(cartId);
    }

    @ApiOperation({ summary: 'add a product to cart as an order' })
    // @ApiParam({ name: 'cartId', type: Number })
    // @ApiParam({ name: 'productId', type: Number })
    @Put('addProduct/')
    addPoduct(@Body() addProductToCartDto: AddProductToCartDto) {
        return this.cartService.addProduct(addProductToCartDto)
    }



    // @Put('addProduct/:cartId/:productId')
    // addPoduct(@Param('cartId') cartId, @Param('productId') productId) {
    //     return this.cartService.addProduct(cartId, productId)
    // }



    @ApiOperation({ summary: 'delete an order from cart and delete order from db' })
    @ApiParam({ name: 'cartId', type: Number })
    @ApiParam({ name: 'orderId', type: Number })
    @Delete('delOrder/:cartId/:orderId')
    delOrder(@Param('cartId') cartId, @Param('orderId') orderId) {
        return this.cartService.delOrder(cartId, orderId)
    }

    @ApiOperation({ summary: 'update order qtt' })
    @Put('updateOrderQtt')
    updateQtt(@Body() updateOrderInCartDto: UpdateOrderInCartDto) {
        return this.cartService.updateOrder(updateOrderInCartDto)
    }



    // @ApiOperation({ summary: 'delete a product from cart (doesn\'t delete the product)' })
    // @ApiParam({ name: 'cartId', type: Number })
    // @ApiParam({ name: 'productId', type: Number })
    // @Delete('delProduct/:cartId/:productId')
    // delProduct(@Param('cartId') cartId, @Param('productId') productId) {
    //     // this.productService.del(productId)
    //     return this.cartService.delProduct(cartId, productId)
    // }

    // @ApiOperation({ summary: 'delete product from cart (and delete the product)' })
    // @ApiParam({ name: 'cartId', type: Number })
    // @ApiParam({ name: 'productId', type: Number })
    // @Delete('removeProduct/:cartId/:productId')
    // removeProduct(@Param('cartId') cartId, @Param('productId') productId) {
    //     this.productService.del(productId)
    //     return this.cartService.delProduct(cartId, productId)
    // }

    @ApiOperation({ summary: 'get all orders in the cart' })
    @ApiBearerAuth()
    @ApiParam({ name: 'cartId', type: Number })
    @Get('all/:cartId')
    findByCart(@Param('cartId') cartId) {
        return this.cartService.findByCart(cartId)
    }
}
