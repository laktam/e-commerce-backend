import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Cart } from '../../cart/entities/cart.entity';

@Entity()
export class User {

    constructor(name: string, password: string, email: string) {
        this.name = name
        this.password = password
        this.email = email
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;

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