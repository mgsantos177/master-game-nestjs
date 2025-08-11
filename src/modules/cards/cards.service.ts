import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import {Prisma, Card, Category} from '@prisma/client'


// create a unit test for this service, you are allowed to create a new test file in this directory AI!
@Injectable()
export class CardService {
    constructor(private prisma: PrismaService) {}

    async createCard( data: Prisma.CardCreateInput) : Promise<Card> {
        return this.prisma.card.create({data})
    }

    async createCards( data: Prisma.CardCreateManyArgs) : Promise<void> {
        await this.prisma.card.createMany(data)
    }

    async findRandomUnansweredCardByCategory(category: Category) : Promise<Card> {
        const findRandomUnansweredByCategory = await this.prisma.card.findMany({
            where: {
                category,
                isAnswered: false,
            }
        })

        if(findRandomUnansweredByCategory.length === 0) {
            return null;
        }

        const randomIndex = Math.floor(Math.random() * findRandomUnansweredByCategory.length);
        const randomCard = findRandomUnansweredByCategory[randomIndex]

        return randomCard;
    }

    async markCardAsAnswered(_id: string): Promise<void> {
        await this.prisma.card.update({
            where: {id: _id},
            data: {isAnswered: true }
        })
    }
}