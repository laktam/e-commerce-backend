import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardDto } from './dto/card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CardService {

    constructor(@InjectRepository(Card) private cardRepo: Repository<Card>) { }

    async check(cardDto: CardDto) {
        console.log(cardDto);
        
        const card = await this.cardRepo.findOneBy({
            name: cardDto.name,
        })

        const { id, ...rest } = card
        console.log("card dto --------------");
        // console.log(cardDto);
        // console.log(rest)

        if (JSON.stringify(cardDto) === JSON.stringify(rest)) {
            console.log(true)
            return true
        }
        return false

        // console.log(this.areEqualShallow(cardDto, rest))
        // return this.areEqualShallow(cardDto, rest)
    }

    // areEqualShallow(a: CardDto, b: CardDto) {
    //     let key: keyof typeof a;
    //     for (key in a) {
    //         // console.log(key);
    //         if (a[key] !== b[key]) {
    //             return false;
    //         }
    //     }
    //     return true;
    // }

    create(createCardDto: CreateCardDto) {
        return 'This action adds a new card';
    }



    findAll() {
        return `This action returns all card`;
    }

    findOne(id: number) {
        return `This action returns a #${id} card`;
    }

    update(id: number, updateCardDto: UpdateCardDto) {
        return `This action updates a #${id} card`;
    }

    remove(id: number) {
        return `This action removes a #${id} card`;
    }
}
