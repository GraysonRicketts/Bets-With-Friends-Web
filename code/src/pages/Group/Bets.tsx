import { Button, IconButton, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { ButtonRow } from "../../components/ButtonRow";
import { Bet, Category } from "../../interfaces";
import AddIcon from '@mui/icons-material/Add';
import { EditBetModal } from "./EditBetModal";

interface Props {
    bets: Bet[]
}
interface GroupedBets {
    category: Category | undefined;
    bets: Bet[];
}

function groupByCategory(bets: Bet[]): GroupedBets[] {
    const groupedBets: GroupedBets[] = [];

    bets.forEach((b) => {
        const categoryGroup = groupedBets.find(gb => (!gb.category && !b.category) || gb.category?.id === b.category?.id);
        if (categoryGroup) {
            categoryGroup.bets.push(b)
        } else {
            groupedBets.push({ category: b.category, bets: [b] })
        }
    })

    return groupedBets;
}

export const Bets: React.FC<Props> = ({ bets }) => {
    const groupedBets = groupByCategory(bets);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editBet, setEditBet] = useState<Bet | undefined>(undefined);

    const addBet = () => {
        // TODO
    }

    return <>{groupedBets.map(gb => {
        return <Box key={`gb_bets_${gb.category?.id}`} sx={{ marginBottom: '3em' }}>
            <Typography>{gb.category?.name || 'Uncategorized'}</Typography>

            {gb.bets.map(b => {
                return <ButtonRow onClick={() => {
                    setIsEditModalOpen(true)
                    setEditBet(b)
                }}>
                    <Typography>{b.title}</Typography>
                </ButtonRow>
            })}

            <IconButton aria-label="add">
                <AddIcon />
            </IconButton>
        </Box>
    })}
        {editBet && <EditBetModal isOpen={isEditModalOpen} bet={editBet} onClose={() => { setIsEditModalOpen(false) }} />}
    </>
}