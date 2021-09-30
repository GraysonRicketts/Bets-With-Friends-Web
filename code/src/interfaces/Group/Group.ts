import { uuid , User, Bet} from "..";

export interface Group {
    id: uuid;
    name: string;
    members: User[];
    bets: Bet[]
}

