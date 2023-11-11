import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import {Prisma, Card} from '@prisma/client'

@Injectable()
export class CardService {
    constructor(private prisma: PrismaService) {}

    async createCard( data: Prisma.CardCreateInput) : Promise<Card> {
        return this.prisma.card.create({data})
    }
}