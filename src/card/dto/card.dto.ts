import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CardDto {
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @ApiProperty()
    number: string;

    @IsNotEmpty()
    @ApiProperty()
    expirationDate: string;

    @IsNotEmpty()
    @ApiProperty()
    cvv: string;
}