import { Box, Button, Modal, TextField, IconButton, Typography, Select } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Category } from '../../../interfaces'
import { modalStyle } from "./modalStyle";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    categories: Category[]
}

export const AddBetModal: React.FC<Props> = ({ isOpen, onClose, categories }) => {
    const [title, setTitle] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [additionalOption, setAdditionalOption] = useState<string>('');
    const [addedOptions, setAddedOptions] = useState<string[]>([]);
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category>();

    const onAddBet = () => {
        // TODO: call save
        onClose();
    }

    return <Modal open={isOpen} onClose={() => {
        onClose();
    }}>
        <Box sx={modalStyle}>
            <div>
                <TextField
                    id="bet-title"
                    label="Enter your bet here"
                    value={title}
                    onChange={(event) => { setTitle(event.target.value.trim()) }} />
                { }

                {categories.length && <><Select
                    labelId="select-category"
                    id="select-category"
                    value={selectedCategory?.name}
                    label="Category"
                    onChange={(e) => {
                        const category = categories.find(c => c.name === e.target.value)
                        setSelectedCategory(category)
                    }}
                ></Select></>}
                {categories.length && !showAddCategory && 
                <><IconButton aria-label="add category" onClick={() => { setShowAddCategory(true) }}>
                    <AddIcon />
                </IconButton>
                <Typography>Add a category</Typography>
                </>}
                {showAddCategory && <TextField
                    id="add-category"
                    label="Add a new category"
                    value={newCategory}
                    onChange={(event) => { setNewCategory(event.target.value.trim()) }}
                />}

                <TextField
                    id="selected-option"
                    label="Enter your choice"
                    value={selectedOption}
                    onChange={(event) => { setSelectedOption(event.target.value.trim()) }}
                />
                <TextField
                    id="bet-amount-input"
                    label="Bet"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={amount}
                    onChange={(event) => { setAmount(parseInt(event.target.value)) }}
                />
                <TextField
                    id="bet-other-options"
                    label="Enter other options here"
                    value={additionalOption}
                    onChange={(event) => { setAdditionalOption(event.target.value) }}
                />
                <IconButton aria-label="add" onClick={() => {
                    if (!additionalOption) {
                        return
                    }

                    setAddedOptions([...addedOptions, additionalOption]);
                    setAdditionalOption('');
                }}>
                    <AddIcon />
                </IconButton>
                {addedOptions.map(ao => <Typography>{ao}</Typography>)}
            </div>
            <Button onClick={() => { onAddBet() }}>Save</Button>
        </Box>
    </Modal>
}