import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { ButtonRow } from "../../components/ButtonRow";
import { Bet, Category } from "../../interfaces";
import AddIcon from '@mui/icons-material/Add';
import { EditBetModal } from "./EditBetModal";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface Props {
    bets: Bet[]
}
interface GroupedBets {
    category: Category | undefined;
    bets: Bet[];
}

// TODO: Add unit tests
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

export const CategorizedBets: React.FC<Props> = ({ bets }) => {
    const categorizedBets = groupByCategory(bets);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editBet, setEditBet] = useState<Bet | undefined>(undefined);
    const userId = useSelector((state: RootState) => state.user.id)

    return <>{categorizedBets.map(gb => {
        return <Box key={`gb_bets_${gb.category?.id}`} sx={{ marginBottom: '3em' }}>
            <Typography>{gb.category?.name || 'Uncategorized'}</Typography>

            {gb.bets.map(b => {
                const isWagerPlaced = b.wagers.find(w => w.user.id === userId)
                const wagerStyle = isWagerPlaced && {
                    backgroundColor: 'lightblue'
                }
                return <ButtonRow onClick={() => {
                    setIsEditModalOpen(true)
                    setEditBet(b)
                }}
                    sx={wagerStyle}>
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