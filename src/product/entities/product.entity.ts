import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Min } from 'class-validator';
import { Image } from './image.entity';
import { Category } from './category.entity';


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

    @ManyToOne(() => Category, (category) => category.products)
    category: Category;
}
    // @ManyToMany(() => Cart, (cart) => cart.products)
    // carts: Cart[]

    // () => Cart: specifies the type of the related entity

    // @ManyToOne(() => Cart, (cart) => cart.products, {
    //     onDelete: "SET NULL", //
    // })
    // cart: Cart

// {
//     onDelete: "CASCADE", // 
// }