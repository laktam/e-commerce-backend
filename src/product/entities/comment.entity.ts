import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { Product } from './product.entity';


@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'longtext' })
    content: string;

    @ManyToOne(() => Product, (product) => product.comments, {
        onDelete: 'CASCADE'
    })
    product: Product;

    @Column()
    username: string;
}