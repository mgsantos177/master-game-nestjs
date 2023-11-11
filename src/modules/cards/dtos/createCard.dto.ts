import { Category} from '@prisma/client'

export class CreateCardDto {
    readonly question: string;
    readonly options: string[];
    readonly answer: string;
    readonly category: Category;
  }