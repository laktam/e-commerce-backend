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
@ApiTags('Product, Category, Comment')
@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService

    ) { }

    @ApiOperation({ summary: 'search product' })
    @Get('search/:productName')
    @Public()
    findByName(@Param('productName') productName: string,) {
        return this.productService.findByName(productName)
    }

    //doesn't return images
    @ApiOperation({ summary: 'get all product (with no images)' })
    @Get('all')
    // @Public()
    @ApiBearerAuth()
    findAll() {
        return this.productService.findAll()
    }

    @ApiOperation({ summary: 'get all categories with products' })
    @Get('categories')
    @Public()
    allCategories() {
        return this.productService.allCategories()
    }

    // @ApiOperation({ summary: 'get list of category names' })
    // @Get('catNames')
    // @Public()
    // getCategories() {
    //     return this.productService.getCategories()
    // }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'add comment' })
    @Post('comment')
    addComment(@Body() addCommentDto: { productId: number, comment: string, username: string, }) {
        console.log("add comment");

        return this.productService.addComment(addCommentDto)
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'get all comments' })
    @Get('all/comments')
    getAllComments() {
        return this.productService.getAllComments()
    }






    // @ApiBearerAuth()
    // @ApiOperation({ summary: 'create a product' })
    // @Post('create')
    // create(@Body() product: ProductDto) {
    //     console.log()
    //     // return this.productService.create(product);
    // }

    @ApiOperation({ summary: 'Create a new Product' })
    // @Public()
    @ApiBearerAuth()
    @Post('create')
    @UseInterceptors(FilesInterceptor('files'))
    add(@UploadedFiles() files: Array<Express.Multer.File>, @Req() request) {
        const product = JSON.parse(request.body.product) as Product
        console.log(product)
        return this.productService.create(files, product, request.body.category)
    }

    @ApiOperation({ summary: 'Update a product' })
    // @Public()
    @ApiBearerAuth()
    @Put('update')
    @UseInterceptors(FilesInterceptor('files'))
    update(@UploadedFiles() files: Array<Express.Multer.File>, @Req() request) {
        const product = JSON.parse(request.body.product) as Product
        console.log(request.body.category);

        return this.productService.update(files, product, request.body.category)
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'delete product' })
    @ApiParam({ name: 'productId', type: Number })
    @Delete('delete/:productId')
    delProduct(@Param('productId') productId) {
        return this.productService.del(productId)
    }

    @Public()
    @ApiOperation({ summary: 'Get product quantity' })
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

    @ApiBearerAuth()
    @ApiOperation({ summary: 'add category' })
    @Post('addCategory')
    addCategory(@Body() category: { categoryName: string }) {
        return this.productService.addCategory(category.categoryName)
    }
    // @ApiOperation({ summary: 'get all products in the cart' })
    // @ApiBearerAuth()
    // @Get()
    // findByCart(cart: Cart) {

    // }
    @Public()
    @ApiOperation({ summary: 'get product by id' })
    @Get('/:productId')
    findOne(@Param('productId') productId: number) {
        return this.productService.FEfindOne(productId)
    }
}
