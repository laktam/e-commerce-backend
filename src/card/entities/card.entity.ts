import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Card {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    number: string;

    @Column({ type: 'date' })
    expirationDate: Date;

    // @Column()
    // expirationDate: Date;

    @Column()
    cvv: string;


}