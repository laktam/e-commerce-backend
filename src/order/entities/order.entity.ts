import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";
import { Min } from "class-validator";

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    // @OneToOne(() => Product)
    @ManyToOne(() => Product)
    // @JoinColumn()
    product: Product

    @Min(0)
    @Column({ default: 1, })
    quantity: number;


}

// , {
//     onDelete: "SET NULL",
// }