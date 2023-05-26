import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, UploadedFiles, UseInterceptors, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/create-product.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/public.decorator';
import { UpdateProdDto } from './dto/update-product.dts';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Product } from './entities/product.entity';
import { Image } from './entities/image.entity';

// @ApiBearerAuth()
@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService

    ) { }

    @ApiOperation({ summary: 'get all product' })
    @Get('all')
    @Public()
    findAll() {
        return this.productService.findAll()
    }

    @ApiOperation({ summary: 'get product by id' })
    @Get('/:productId')
    findOne(@Param('productId') productId: number) {
        return this.productService.findOne(productId)
    }

    // @ApiBearerAuth()
    // @ApiOperation({ summary: 'create a product' })
    // @Post('create')
    // create(@Body() product: ProductDto) {
    //     console.log()
    //     // return this.productService.create(product);
    // }

    @Public()
    @Post('create')
    @UseInterceptors(FilesInterceptor('files'))
    add(@UploadedFiles() files: Array<Express.Multer.File>, @Req() request) {
        const product = JSON.parse(request.body.product) as Product
        console.log(product)
        return this.productService.create(files, product)
    }

    @Public()
    @Put('update')
    @UseInterceptors(FilesInterceptor('files'))
    update(@UploadedFiles() files: Array<Express.Multer.File>, @Req() request) {
        const product = JSON.parse(request.body.product) as Product
        return this.productService.update(files, product) 
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'delete product' })
    @ApiParam({ name: 'productId', type: Number })
    @Delete('delete/:productId')
    delProduct(@Param('productId') productId) {
        return this.productService.del(productId)
    }

    @Public()
    @ApiOperation({ summary: 'product quantity' })
    @ApiParam({ name: 'productId', type: Number })
    @Get('quantity/:productId')
    productQuantity(@Param('productId') productId) {
        return this.productService.productQuantity(productId)
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'update product quantity' })
    @Put('updateQtt')
    updateProductQtt(@Body() prod: UpdateProdDto) {
        return this.productService.updateProductQtt(prod)
    }


    // @ApiOperation({ summary: 'get all products in the cart' })
    // @ApiBearerAuth()
    // @Get()
    // findByCart(cart: Cart) {

    // }
}
