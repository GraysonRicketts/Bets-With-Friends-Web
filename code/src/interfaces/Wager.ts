import { User,points, uuid  } from "./index";

export interface Wager {
    id: uuid;
    amount: points;
    user: User;
}