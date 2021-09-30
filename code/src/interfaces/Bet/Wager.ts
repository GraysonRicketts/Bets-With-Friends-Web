import { User,points, uuid  } from "../index";

export interface Wager {
    id: uuid;
    option: Option;
    amount: points;
    user: User;
}