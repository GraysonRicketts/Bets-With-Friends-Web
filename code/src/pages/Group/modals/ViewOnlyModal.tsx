import { Box, Button, Modal, TextField, Typography, IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { Bet, Option } from "../../../interfaces"
import { modalStyle } from "./modalStyle";

interface Props {
    bet: Bet;
    isOpen: boolean;
    onClose: () => void;
}

enum ModalProgress {
    Edit, SelectOption, Confirm
}

export const ViewOnlyModal: React.FC<Props> = ({ bet, isOpen, onClose }) => {
    return <Modal open={isOpen} onClose={() => {
        onClose();
    }}>
        <Box sx={modalStyle}>
            <Typography>{bet.title}</Typography>

            {bet.category && <Typography>Category: {bet.category.name}</Typography>}

            {bet.wagers.map(w => {
                return <Typography key={`wager-${w.user.name}-${w.option.name}-${w.amount}`}>{w.user.name} - {w.option.name} - {w.amount}</Typography>
            })}

            <Typography>Outcome: {bet.outcome?.name}</Typography>
        </Box>
    </Modal>
}