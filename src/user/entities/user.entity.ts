import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Cart } from '../../cart/entities/cart.entity';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@Entity()
export class User {

    constructor(name: string, password: string, email: string) {
        this.name = name
        this.password = password
        this.email = email
    }

    @PrimaryGeneratedColumn()
    id: number;

    // @IsNotEmpty()
    @Column()
    name: string;

    // @IsNotEmpty()
    @MinLength(6)
    @Column()
    password: string;

    // @IsNotEmpty()
    // @IsEmail()
    @Column()
    email: string;

    @OneToOne(() => Cart
        , { cascade: true })
    @JoinColumn()
    cart: Cart

}
// , {
//     onDelete: "CASCADE", // <---- HERE
// }