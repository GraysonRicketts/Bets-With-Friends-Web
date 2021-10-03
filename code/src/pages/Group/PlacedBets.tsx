import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { ButtonRow } from "../../components/ButtonRow";
import { Bet, Category, uuid } from "../../interfaces";
import AddIcon from '@mui/icons-material/Add';
import { EditBetModal } from "./EditBetModal";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface Props {
    bets: Bet[]
}
interface GroupedBets {
    isPlaced: boolean
    bets: Bet[];
}

function groupByPlacement(bets: Bet[], userId: uuid): GroupedBets[] {
    const groupedBets: GroupedBets[] = [ { isPlaced: true, bets: []}, {isPlaced: false, bets: []}];

    bets.forEach((b) => {
        if (b.wagers.find(w => w.user.id === userId)) {
            groupedBets.find(gb => gb.isPlaced)?.bets.push(b);
        } else {
            groupedBets.find(gb => !gb.isPlaced)?.bets.push(b);
        }
    })

    return groupedBets;
}

export const PlacedBets: React.FC<Props> = ({ bets }) => {
    const userId = useSelector((state: RootState) => state.user.id)
    const groupedBets = groupByPlacement(bets, userId);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editBet, setEditBet] = useState<Bet | undefined>(undefined);
    

    return <><Box sx={{ marginBottom: '3em' }}>
            <Typography>Unplaced</Typography>

            {groupedBets.find(gb => !gb.isPlaced)?.bets.map(b => {
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

        <Box sx={{ marginBottom: '3em' }}>
            <Typography>Pending</Typography>

            {groupedBets.find(gb => gb.isPlaced)?.bets.map(b => {
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
        {editBet && <EditBetModal isOpen={isEditModalOpen} bet={editBet} onClose={() => { setIsEditModalOpen(false) }} />}
    </>
}