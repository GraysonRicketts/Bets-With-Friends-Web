import React from "react";
import { Bet, Category } from "../../interfaces";

interface Props {
    bets: Bet[]
}
interface GroupedBets {
    category: Category | undefined; 
    bets: Bet[];
}

function groupByCategory(bets: Bet[]): GroupedBets[] {
    const groupedBets: GroupedBets[] = [];

    bets.forEach(b => {
        const categoryGroup = groupedBets.find(gb => (!gb.category && !b.category) || gb.category?.id === b.category?.id);
        if (categoryGroup) {
            categoryGroup.bets.push(b)
        } else {
            groupedBets.push({ category: b.category, bets: [b]})
        }
    })

    return groupedBets;
}

export const Bets: React.FC<Props> = ({ bets }) => {
    const groupedBets = groupByCategory(bets);

    return <>Bets</>
}