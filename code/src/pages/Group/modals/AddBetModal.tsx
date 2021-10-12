import {
  Box,
  Button,
  Modal,
  TextField,
  IconButton,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Category } from "../../../interfaces";
import { modalStyle } from "./modalStyle";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}

export const AddBetModal: React.FC<Props> = ({
  isOpen,
  onClose,
  categories,
}) => {
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [additionalOption, setAdditionalOption] = useState<string>("");
  const [addedOptions, setAddedOptions] = useState<string[]>([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  const [isBetError, setIsBetError] = useState(false);
  const [isOptionError, setIsOptionError] = useState(false);
  const [isAmountError, setIsAmountError] = useState(false);
  const [isAddedOptionError, setIsAddedOptionError] = useState(false);

  const onAddBet = () => {
    // TODO: call save
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      <Box sx={modalStyle}>
        <Typography variant="h5" sx={{ marginBottom: "1em" }}>
          Add a bet
        </Typography>
        <div>
          <TextField
            id="bet-title"
            required
            error={isBetError}
            label="What's the bet?"
            InputLabelProps={{
              shrink: true,
            }}
            value={title}
            onChange={(event) => {
              setIsBetError(false);
              setTitle(event.target.value.trim());
            }}
            sx={{ width: "100%", marginBottom: "1em" }}
          />
          {}

          {categories.length && !showAddCategory && (
            <Box sx={{marginBottom: '1em', display: 'flex', alignItems: 'center'}}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-standard-label">
                  Category
                </InputLabel>
                <Select
                  labelId="select-category"
                  id="select-category"
                  value={selectedCategory?.name}
                  label="Category"
                  onChange={(e) => {
                    const category = categories.find(
                      (c) => c.name === e.target.value
                    );
                    setSelectedCategory(category);
                  }}
                >
                  {categories.map((c) => (
                    <MenuItem value={c.name} key={`category_id_${c.id}`}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <IconButton
                aria-label="add category"
                onClick={() => {
                  setShowAddCategory(true);
                }}
              >
                <AddIcon />
                <Typography>Add a category</Typography>
              </IconButton>
            </Box>
          )}

          {showAddCategory && (
            <TextField
              id="add-category"
              label="Add a new category"
              InputLabelProps={{
                shrink: true,
              }}
              value={newCategory}
              onChange={(event) => {
                setNewCategory(event.target.value.trim());
              }}
              sx={{ marginBottom: "1em" }}
            />
          )}

          <TextField
            id="selected-option"
            label="How do you think this will outcome?"
            error={isOptionError}
            InputLabelProps={{
              shrink: true,
            }}
            required
            value={selectedOption}
            onChange={(event) => {
              setIsOptionError(false);
              setSelectedOption(event.target.value.trim());
            }}
            sx={{ marginBottom: "1em" }}
          />
          <TextField
            id="bet-amount-input"
            required
            label="How many points do you wager?"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            error={isAmountError}
            value={amount}
            onChange={(event) => {
              setIsAmountError(false);
              setAmount(parseInt(event.target.value));
            }}
            sx={{ marginBottom: "1em" }}
          />

          <Box sx={{display: 'flex', alignItems:'center'}}>
          <TextField
            id="bet-other-options"
            label="Enter other outcomes here"
            InputLabelProps={{
              shrink: true,
            }}
            error={isAddedOptionError}
            required={!addedOptions.length}
            value={additionalOption}
            onChange={(event) => {
              setAdditionalOption(event.target.value);
            }}
          />
          <IconButton
            aria-label="add"
            onClick={() => {
              if (!additionalOption) {
                return;
              }

              setIsAddedOptionError(false);
              setAddedOptions([...addedOptions, additionalOption]);
              setAdditionalOption("");
            }}
          >
            <AddIcon />
          </IconButton>
          </Box>

          {!!addedOptions.length && (
            <Box sx={{ marginBottom: "1em" }}>
              <Typography variant="caption">Additional outcomes</Typography>
              {addedOptions.map((ao) => (
                <Typography>{ao}</Typography>
              ))}
            </Box>
          )}
        </div>
        <Button
          onClick={() => {
            let error = false;
            if (!selectedOption) {
              error = true;
              setIsOptionError(true);
            }
            if (!title) {
              error = true;
              setIsBetError(true);
            }
            if (!amount) {
              error = true;
              setIsAmountError(true);
            }
            if (!addedOptions.length) {
              error = true;
              setIsAddedOptionError(true);
            }

            if (error) {
              return;
            }
            onAddBet();
          }}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};
