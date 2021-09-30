import { Box } from "@mui/system";
import { Typography } from '@mui/material';
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
    { id: '123', name: 'Yes' },
    { id: '234', name: 'No' }
];

const fakedWagers: Wager[] = [
    { id: '123', option: fakedOptions[0], amount: 20, user: fakedMembers[0] }
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

export const Groups: React.FC = () => {
    const groups: Group[] = [fakedGroup];

    return <>{
        groups.map(g => {
            return (
                <Box key={g.id+'group'}
                sx={{
                    borderRadius: 3,
                    border: '1px solid dimgray',
                    padding: '1em'
                }}>
                    <Typography>{g.name}</Typography>
                    <Typography>{g.members.length} Friends</Typography>
                    <Typography>
                        {g.bets.length} Bets</Typography>
                </Box>
                )
        })
    }</>;
}