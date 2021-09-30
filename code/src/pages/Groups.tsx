import React from "react"
import { Bet, Group, Option, User, Wager } from "../interfaces";

const fakedMembers: User[] = [
    {
        id: '123',
        name: 'Jim'
    },
    {
        id: '234',
        name: 'Lauren'
    },
    {
        id: '345',
        name: 'Sue'
    },
    {
        id: '567',
        name: 'Dean'
    },
    {
        id: '678',
        name: 'Kelly'
    },
]

const fakedOptions: Option[] = [
    {id: '123', name: 'Yes'},
    {id: '234', name: 'No'}
];

const fakedWagers: Wager[] = [
    {id: '123', option: fakedOptions[0], amount: 20, user: fakedMembers[0]}
]

const fakedBets: Bet[] = [
    {
        id: '123',
        title: 'Naggy is sacked',
        options: fakedOptions,
        isOpen: true,
        wagers: fakedWagers
    }
]

const fakedGroup: Group = {
    id: 'faked',
    name: 'Bears boys',
    members: fakedMembers,
    bets: fakedBets
}

export const Groups = (): React.FC => {
    const fakedGroup = fakedGroup;
    
    return <></>;
}