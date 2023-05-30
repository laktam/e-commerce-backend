import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { Product } from './product.entity';


@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'longblob' })
    content: Buffer|string;

    @ManyToOne(() => Product, (product) => product.images, {
        onDelete: 'CASCADE'
    })
    product: Product
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