import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPositive, Min } from "class-validator";

export class UpdateProdDto {
    @ApiProperty()
    @IsNotEmpty()
    productId: number;

    @Min(0)
    @IsNotEmpty()
    @ApiProperty()
    productQtt: number;
}