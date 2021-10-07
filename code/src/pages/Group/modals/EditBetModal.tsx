import { Box, Button, Modal, TextField, Typography, IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from "react-redux";
import { useState } from "react";
import { Bet, Option } from "../../../interfaces"
import { modalStyle } from "./modalStyle";
import { RootState } from "../../../app/store";

interface Props {
    bet: Bet;
    isOpen: boolean;
    onClose: () => void;
}

enum ModalProgress {
    Edit, SelectOption, Confirm
}

export const EditBetModal: React.FC<Props> = ({ bet, isOpen, onClose }) => {
    const userId = useSelector((state: RootState) => state.user.id)
    const [betInput, setBetInput] = useState(0);
    const [modalProgress, setModalProgress] = useState<ModalProgress>(ModalProgress.Edit);
    const [selectedOutcome, setSelectedOutcome] = useState<Option | undefined>();
    const [wagerOption, setWagerOption] = useState<Option | undefined>();
    const [isWagerUnplaced, setIsWagerUnplaced] = useState<boolean>(!bet.wagers.find(w => w.user.id === userId));

    const handleClose = () => {
        setSelectedOutcome(undefined);
        setBetInput(0)
        setModalProgress(ModalProgress.Edit);
        onClose();
    }

    const EditPage = <>
        <Typography>{bet.title}</Typography>

        {bet.category && <Typography>Category: {bet.category.name}</Typography>}

        {isWagerUnplaced &&
            <> {bet.options.map(o => {
                const variant = o.name === wagerOption?.name ? "contained" : "outlined";
                return <Button variant={variant} key={`option-button-${o.id}`} onClick={() => {
                    setWagerOption(o);
                }}>
                    <Typography>{o.name}</Typography>
                </Button>
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
                <Button aria-label="add-wager" onClick={() => { 
                    // TODO: add modal to confirm wager
                    setIsWagerUnplaced(true) }
                }>
                    <Typography>Save wager</Typography><AddIcon  />
                </Button>
            </>
        }

        {bet.wagers.map(w => {
            return <Typography key={`wager-${w.user.name}-${w.option.name}-${w.amount}`}>{w.user.name} - {w.option.name} - {w.amount}</Typography>
        })}

        <Button onClick={() => { setModalProgress(ModalProgress.SelectOption) }}>Close bet</Button>
        <IconButton aria-label="delete-bet" onClick={() => { }}>
            <DeleteIcon />
        </IconButton>
    </>

    const SelectOptionPage = <>
        <Typography>What was the final outcome?</Typography>

        <Typography>Bet: {bet.title}</Typography>
        {bet.options.map(o => {
            const variant = o.name === selectedOutcome?.name ? "contained" : "outlined";
            return <Button variant={variant} key={`select-option-button-${o.id}`} onClick={() => {
                setModalProgress(ModalProgress.Confirm)
                setSelectedOutcome(o);
            }}><Typography>{o.name}</Typography></Button>
        })}
    </>

    const ConfirmPage = <>
        <Typography>Final outcome - {bet.title} - {selectedOutcome?.name}</Typography>

        <Typography>Close bet?</Typography>
        <Button variant="outlined">Yes</Button>
        <Button variant="outlined">No</Button>
    </>

    return <Modal open={isOpen} onClose={handleClose}>
        <Box sx={modalStyle}>
            {
                modalProgress === ModalProgress.Edit ? EditPage
                    : modalProgress === ModalProgress.SelectOption ? SelectOptionPage
                        : ConfirmPage
            }
        </Box>
    </Modal>
}