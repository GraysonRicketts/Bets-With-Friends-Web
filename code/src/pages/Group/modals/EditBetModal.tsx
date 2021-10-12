import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  IconButton,
  FormControl,
  ButtonGroup,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Bet, Option } from '../../../interfaces';
import { modalStyle } from './modalStyle';
import { RootState } from '../../../app/store';

interface Props {
  bet: Bet;
  isOpen: boolean;
  onClose: () => void;
}

enum ModalProgress {
  Edit,
  SelectOption,
  Confirm,
}

const optionButtonStyle = {
  marginRight: '0.5em',
};

export const EditBetModal: React.FC<Props> = ({ bet, isOpen, onClose }) => {
  const userId = useSelector((state: RootState) => state.user.id);
  const [modalProgress, setModalProgress] = useState<ModalProgress>(
    ModalProgress.Edit,
  );
  const [selectedOutcome, setSelectedOutcome] = useState<Option | undefined>();
  const [wagerOption, setWagerOption] = useState<Option | undefined>();
  const [isOptionUnchosenErr, setIsOptionUnchosenErr] = useState(false);
  const [isWagerConfirmOpen, setIsWagerConfirmOpen] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);

  // TODO: use responsiveness to fix this
  const [isWagerUnplaced, setIsWagerUnplaced] = useState<boolean>(true);

  const handleClose = () => {
    setSelectedOutcome(undefined);
    setBetInput(0);
    setModalProgress(ModalProgress.Edit);
    onClose();
  };

  const [betInput, setBetInput] = useState(0);
  const [isBetInputError, setIsBetInputError] = useState(false);
  const handleBetInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const input = event.target.value;
    if (!input || !input.trim()) return;

    try {
      const newVal = parseInt(input.trim());
      if (newVal < 0) {
        setIsBetInputError(true);
        return;
      }
      setIsBetInputError(false);
      setBetInput(parseInt(event.target.value));
    } catch (err) {
      setIsBetInputError(true);
      return;
    }
  };

  const EditPage = (
    <>
      <Box sx={{ marginBottom: '1em' }}>
        <Typography variant="h6">{bet.title}</Typography>
        {bet.category && (
          <Typography variant="subtitle2">
            Category: {bet.category.name}
          </Typography>
        )}
      </Box>

      <Box sx={{ marginBottom: '1em' }}>
        {isWagerUnplaced && !bet.wagers.find((w) => w.user.id === userId) && (
          <FormControl sx={{ marginBottom: '1em', width: '100%' }}>
            <ButtonGroup variant="outlined" aria-label="options button group">
              {bet.options.map((o) => {
                const variant =
                  o.name === wagerOption?.name ? 'contained' : 'outlined';
                return (
                  <Button
                    variant={variant}
                    key={`option-button-${o.id}`}
                    onClick={() => {
                      setIsOptionUnchosenErr(false);
                      setWagerOption(o);
                    }}
                    sx={{ marginBottom: '0.25em' }}
                  >
                    <Typography>{o.name}</Typography>
                  </Button>
                );
              })}
            </ButtonGroup>
            <TextField
              id="bet-input"
              error={isBetInputError}
              label="Bet"
              type="number"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              value={betInput}
              onChange={handleBetInputChange}
              sx={{ marginTop: '0.5em' }}
            />
            <Button
              aria-label="add-wager"
              onClick={() => {
                if (!wagerOption) {
                  setIsOptionUnchosenErr(true);
                  return;
                }
                setIsWagerConfirmOpen(true);
              }}
            >
              <Typography>Save wager</Typography>
              <AddIcon />
            </Button>
            {isOptionUnchosenErr && (
              <Typography
                variant="subtitle2"
                sx={{
                  backgroundColor: 'error.main',
                  color: 'error.contrastText',
                }}
              >
                Must choose an option
              </Typography>
            )}
          </FormControl>
        )}
        {bet.wagers.map((w) => {
          return (
            <Typography
              key={`wager-${w.user.name}-${w.option.name}-${w.amount}`}
              variant="body1"
            >
              {w.user.name} - {w.option.name} - {w.amount}
            </Typography>
          );
        })}
      </Box>

      <Button
        onClick={() => {
          setModalProgress(ModalProgress.SelectOption);
        }}
        variant="contained"
      >
        Close bet
      </Button>
      <IconButton
        aria-label="delete-bet"
        onClick={() => {
          setIsConfirmDelete(true);
        }}
      >
        <DeleteIcon />
      </IconButton>
    </>
  );

  const SelectOptionPage = (
    <>
      <Typography variant="h6">What was the final outcome?</Typography>
      <Typography variant="subtitle1" sx={{ marginBottom: '1em' }}>
        Bet: {bet.title}
      </Typography>

      {bet.options.map((o) => {
        const variant =
          o.name === selectedOutcome?.name ? 'contained' : 'outlined';
        return (
          <Button
            variant={variant}
            key={`select-option-button-${o.id}`}
            onClick={() => {
              setModalProgress(ModalProgress.Confirm);
              setSelectedOutcome(o);
            }}
            sx={optionButtonStyle}
          >
            <Typography>{o.name}</Typography>
          </Button>
        );
      })}
    </>
  );

  const ConfirmPage = (
    <>
      <Typography variant="h6">Close bet?</Typography>
      <Typography variant="subtitle1" sx={{ marginBottom: '1em' }}>
        Final outcome - {bet.title} - {selectedOutcome?.name}
      </Typography>

      <Button variant="outlined" sx={optionButtonStyle}>
        Yes
      </Button>
      <Button variant="outlined">No</Button>
    </>
  );

  return (
    <>
      <Modal open={isOpen} onClose={handleClose}>
        <Box sx={modalStyle}>
          {modalProgress === ModalProgress.Edit
            ? EditPage
            : modalProgress === ModalProgress.SelectOption
            ? SelectOptionPage
            : ConfirmPage}
        </Box>
      </Modal>
      <Modal
        open={isWagerConfirmOpen}
        onClose={() => {
          setIsWagerConfirmOpen(false);
        }}
      >
        <Box sx={modalStyle}>
          <Typography variant="h6">
            {bet.title} - {wagerOption?.name} - {betInput}
          </Typography>
          <Typography variant="subtitle1">
            Are you sure you want to make this wager?
          </Typography>

          <Button
            variant="outlined"
            onClick={() => {
              setIsWagerUnplaced(false);
              setIsWagerConfirmOpen(false);
              handleClose();
            }}
            sx={optionButtonStyle}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setIsWagerConfirmOpen(false);
            }}
          >
            No
          </Button>
        </Box>
      </Modal>
      <Modal
        open={isConfirmDelete}
        onClose={() => {
          setIsConfirmDelete(false);
        }}
      >
        <Box sx={modalStyle}>
          <Typography variant="h6">
            Are you sure you want to delete this bet?
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '1em' }}>
            This cannot be undone.
          </Typography>

          <Button
            variant="outlined"
            sx={{
              backgroundColor: 'error.main',
              color: 'error.contrastText',
              marginRight: '1em',
            }}
            onClick={() => {
              setIsConfirmDelete(false);
            }}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setIsConfirmDelete(false);
            }}
          >
            No
          </Button>
        </Box>
      </Modal>
    </>
  );
};
