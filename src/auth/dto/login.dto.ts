import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @MinLength(6)
    @ApiProperty()
    password: string;
}