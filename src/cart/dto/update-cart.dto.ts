import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min, } from 'class-validator';

export class AddProductToCartDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    cartId: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    productId: number;
}

export class UpdateOrderInCartDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    cartId: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    orderId: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @ApiProperty()
    quantity: number;
}