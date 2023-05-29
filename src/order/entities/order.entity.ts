import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";
import { Min } from "class-validator";

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, { onDelete: 'CASCADE' })//when a product is deleted all the orders referensing it will be deleted
    product: Product

    @Min(0)
    @Column({ default: 1, })
    quantity: number;
}

// , {
//     onDelete: "SET NULL",
// }