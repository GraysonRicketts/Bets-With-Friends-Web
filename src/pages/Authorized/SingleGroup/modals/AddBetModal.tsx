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
  Chip,
  CircularProgress,
} from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Category } from 'src/api/bet';
import { modalStyle } from './modalStyle';
import { createBet as createBetApi } from 'src/api/bet';
import { useMutation, useQueryClient } from 'react-query';
import { GROUP_KEY } from '..';
import { GroupWithBet } from 'src/api/group';

interface Props {
  onClose: () => void;
  categories: Category[];
  groupId: string;
}

export const AddBetModal: React.FC<Props> = ({ onClose, categories, groupId }) => {
  const [title, setTitle] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [additionalOption, setAdditionalOption] = useState<string>('');
  const [addedOptions, setAddedOptions] = useState<string[]>([]);
  const [showAddCategory, setShowAddCategory] = useState(!categories.length);
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  const [isBetError, setIsBetError] = useState(false);
  const [isOptionError, setIsOptionError] = useState(false);
  const [isAmountError, setIsAmountError] = useState(false);
  const [isAddedOptionError, setIsAddedOptionError] = useState(false);
  
  const queryClient = useQueryClient();
  const { isLoading, mutate: createBet } = useMutation(
    () => {
      return createBetApi({
        groupId: groupId,
        title,
        options: addedOptions,
        category: selectedCategory?.name || newCategory,
        wagerOption: selectedOption,
        wagerAmount: amount,
      });
    },
    {
      onSuccess: (newBet) => {
        queryClient.setQueryData<GroupWithBet | undefined>([GROUP_KEY, groupId], (og) => {
          og?.bets.push(newBet);
          return og;
        });
      },
    },
  );

  const handleClickSave = () => {
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
    if (addedOptions.length < 2) {
      error = true;
      setIsAddedOptionError(true);
    }

    if (error) {
      return;
    }
    
    createBet();
    onClose();
  }

  return (
    <Modal
      open
      onClose={() => {
        onClose();
      }}
    >
      <Box sx={modalStyle}>
        {!isLoading && (
          <>
            <Typography variant="h5" sx={{ marginBottom: '1em' }}>
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
                  setTitle(event.target.value);
                }}
                sx={{ width: '100%', mb: 2 }}
              />

              {!showAddCategory && (
                <Box
                  sx={{
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
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
                          (c) => c.name === e.target.value,
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
                    setNewCategory(event.target.value);
                  }}
                  sx={{ marginBottom: '1em' }}
                />
              )}

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <TextField
                  id="bet-other-options"
                  label="Add options"
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
                    if (!additionalOption || !addedOptions.indexOf(additionalOption)) {
                      return;
                    }

                    setIsAddedOptionError(false);
                    setAddedOptions([...addedOptions, additionalOption]);
                    setAdditionalOption('');
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Box>

              {!!addedOptions.length && (
                <Box sx={{ marginBottom: 1 }}>
                  {addedOptions.map((ao) => (
                    <Chip label={ao} variant="outlined" />
                  ))}
                </Box>
              )}

              <FormControl fullWidth sx={{ mb: 1 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Select your wager*
                </InputLabel>
                <Select
                  labelId="select-option"
                  id="select-option"
                  value={selectedOption}
                  label="Select your wager*"
                  onChange={(e) => {
                    setIsOptionError(false);
                    setSelectedOption(e.target.value);
                  }}
                  fullWidth
                  error={isOptionError}
                  required
                >
                  {addedOptions.map((c) => (
                    <MenuItem value={c} key={`option_id_${c}`}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

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
                sx={{ marginBottom: '1em' }}
              />
            </div>
            <Button
              onClick={handleClickSave}
            >
              Save
            </Button>
          </>
        )}
        {isLoading && <CircularProgress />}
      </Box>
    </Modal>
  );
};
