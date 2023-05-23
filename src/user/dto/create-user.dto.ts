import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @ApiProperty()
    @MinLength(6)
    password: string;

    @IsEmail()
    @ApiProperty()
    email: string;
}
