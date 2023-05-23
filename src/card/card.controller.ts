import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardDto } from './dto/card.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('card')
export class CardController {
    constructor(private readonly cardService: CardService) { }


    @ApiBearerAuth()
    @ApiOperation({ summary: 'check and return true if card exist, else false' })
    @Post('check')
    check(@Body() cardDto: CardDto) {
        return this.cardService.check(cardDto)

    } 

    // @Post()
    // create(@Body() createCardDto: CreateCardDto) {
    //     return this.cardService.create(createCardDto);
    // }

    // @Get()
    // findAll() {
    //     return this.cardService.findAll();
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.cardService.findOne(+id);
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    //     return this.cardService.update(+id, updateCardDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.cardService.remove(+id);
    // }
}
