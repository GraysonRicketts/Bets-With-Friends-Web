import { Category, uuid } from ".";

export interface Bet {
    id: uuid;
    title: string;
    category: Category;
    options: string[];
    isOpen: boolean;
}