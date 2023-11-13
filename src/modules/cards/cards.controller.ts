import { Body, Controller, Post, Get, Param, Put } from "@nestjs/common";
import { CardService } from "./cards.service";
import { CreateCardDto } from "./dtos/createCard.dto";
import { Card as CardModel, Category, Prisma} from '@prisma/client'

@Controller('/api/cards')
export class CardController {
    constructor(
        private readonly cardService: CardService,
    ) {}

    @Post()
    async createCard(
        @Body() cardData : CreateCardDto
    ): Promise<CardModel> {
        return this.cardService.createCard(cardData)
    }

    @Post('/batch')
    async createCards(
        @Body() cardsData : CreateCardDto[]
    ): Promise<void> {
        await this.cardService.createCards({data: cardsData})
    }

    @Get(':category')
    async findRandomUnansweredCardByCategory(@Param('category') category: Category): Promise<CardModel> {
        return this.cardService.findRandomUnansweredCardByCategory(category)
    }

    @Put(':id')
    async markCardAsAnswered(@Param('id') id: string) : Promise<void> {
        await this.cardService.markCardAsAnswered(id)
    }
}