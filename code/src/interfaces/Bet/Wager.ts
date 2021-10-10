import { User, points, uuid, Option } from "..";

export interface Wager {
  id: uuid;
  option: Option;
  amount: points;
  user: User;
}
