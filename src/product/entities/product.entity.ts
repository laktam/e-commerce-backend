import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { Min } from 'class-validator';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Min(0)
    @Column({ default: 0 })
    quantity: number;


    @Column()
    description: string;
    // @ManyToMany(() => Cart, (cart) => cart.products)
    // carts: Cart[]

    // () => Cart: specifies the type of the related entity

    // @ManyToOne(() => Cart, (cart) => cart.products, {
    //     onDelete: "SET NULL", // 
    // })
    // cart: Cart
}
// {
//     onDelete: "CASCADE", // 
// }