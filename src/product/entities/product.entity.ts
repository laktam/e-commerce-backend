import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { Min } from 'class-validator';
import { Image } from './image.entity';


@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: 0 })
    price: number;

    @Min(0)
    @Column({ default: 0 })
    quantity: number;


    @Column({ type: 'text' })
    description: string;

    @OneToMany(() => Image, (image) => image.product,
        { cascade: true })
    images: Image[];
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