import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateUserDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    cartId: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    userId: number;
}
