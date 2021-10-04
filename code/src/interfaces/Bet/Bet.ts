import { Category, Option, uuid, Wager } from "..";

export interface Bet {
    id: uuid;
    title: string;
    options: Option[];
    isOpen: boolean;
    wagers: Wager[],
    outcome?: Option;
    category?: Category;
}