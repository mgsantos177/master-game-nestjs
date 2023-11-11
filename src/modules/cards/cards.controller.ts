import { Body, Controller, Post } from "@nestjs/common";
import { CardService } from "./cards.service";
import { CreateCardDto } from "./dtos/createCard.dto";
import { Card as CardModel} from '@prisma/client'

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
}