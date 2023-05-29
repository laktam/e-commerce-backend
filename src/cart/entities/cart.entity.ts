import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Order } from 'src/order/entities/order.entity';
import { Min } from 'class-validator';

@Entity()
export class Cart {

    @PrimaryGeneratedColumn()
    id: number;

    @Min(0)
    @Column({ default: 0 })
    quantity: number;


    @ManyToMany(() => Order, {
        cascade: true,//when saving a cart the products will be saved 
    })
    @JoinTable()
    orders: Order[];


}

// @ManyToMany(() => Product, {
    //     cascade: true,//when saving a cart the products will be saved
    // })
    // @JoinTable()
    // products: Product[];
    // @OneToMany(() => Product, (product) => product.cart,)
