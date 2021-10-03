import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { Bet, Option } from "../../interfaces"

interface Props {
    bet: Bet;
    isOpen: boolean;
    onClose: () => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '1px solid lightgray',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
};

enum ModalProgress {
    Edit, SelectOption, Confirm
}

export const EditBetModal: React.FC<Props> = ({ bet, isOpen, onClose }) => {
    const [betInput, setBetInput] = useState<number>(0);
    const [modalProgress, setModalProgress] = useState<ModalProgress>(ModalProgress.Edit);
    const [seclectedOutcome, setSelectedOutcome] = useState<Option | undefined>(undefined);

    const EditPage = <>
        <Typography>{bet.title}</Typography>

        {bet.category && <Typography>Category: {bet.category.name}</Typography>}

        {bet.options.map(o => {
            return <Button variant="outlined" key={`option-button-${o.id}`}><Typography>{o.name}</Typography></Button>
        })}

        <TextField
            id="bet-input"
            label="Bet"
            type="number"
            InputLabelProps={{
                shrink: true,
            }}
            value={betInput}
            onChange={(event) => { setBetInput(parseInt(event.target.value)) }}
        />

        {bet.wagers.map(w => {
            return <Typography key={`wager-${w.user.name}-${w.option.name}-${w.amount}`}>{w.user.name} - {w.option.name} - {w.amount}</Typography>
        })}

        <Button onClick={() => { setModalProgress(ModalProgress.SelectOption) }}>Close bet</Button>
    </>

    const SelectOptionPage = <>
        <Typography>What was the final outcome?</Typography>

        <Typography>Bet: {bet.title}</Typography>
        {bet.options.map(o => {
            return <Button variant="outlined" key={`select-option-button-${o.id}`} onClick={() => {
                setModalProgress(ModalProgress.Confirm)
                setSelectedOutcome(o);
            }}><Typography>{o.name}</Typography></Button>
        })}
    </>

    const ConfirmPage = <>
        <Typography>Close bet?</Typography>
        <Button variant="outlined">Yes</Button>
        <Button variant="outlined">No</Button>
    </>

    return <Modal open={isOpen} onClose={() => {
        setModalProgress(ModalProgress.Edit);
        onClose();
    }}>
        <Box sx={style}>
            {
                modalProgress === ModalProgress.Edit ? EditPage 
                : modalProgress === ModalProgress.SelectOption ? SelectOptionPage 
                : ConfirmPage
            }
        </Box>
    </Modal>
}