import { Category } from './category.entity';
import { FEImage } from './image.frontend'

export class FEProduct {
    id: number;

    name: string;

    price: number;


    quantity: number;

    description: string;

    images: FEImage[];

    category: Category;
}