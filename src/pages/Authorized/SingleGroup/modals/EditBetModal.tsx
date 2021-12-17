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
import { useAuth } from 'src/app/auth';
import { useState } from 'react';
import { modalStyle } from './modalStyle';
import {
  addWager as addWagerApi,
  closeBet as closeBetApi,
  deleteBet as deleteBetApi,
  Bet,
  Option,
} from 'src/api/bet';
import { useMutation, useQueryClient } from 'react-query';
import { GroupWithBet } from 'src/api/group';
import { GROUP_KEY } from '..';
import { LoadingButton } from '@mui/lab';
import { GET_SCORE } from 'src/app/AppBar';

interface Props {
  bet: Bet;
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

export const EditBetModal: React.FC<Props> = ({ bet, onClose }) => {
  const auth = useAuth();
  const [modalProgress, setModalProgress] = useState<ModalProgress>(
    ModalProgress.Edit,
  );
  const [selectedOutcome, setSelectedOutcome] = useState<Option | undefined>();
  const [wagerOption, setWagerOption] = useState<Option | undefined>();
  const [isOptionUnchosenErr, setIsOptionUnchosenErr] = useState(false);
  const [isWagerConfirmOpen, setIsWagerConfirmOpen] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);

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

  const queryClient = useQueryClient();
  const { isLoading: isAddingWager, mutate: addWager } = useMutation(
    () => {
      return addWagerApi({
        betId: bet.id,
        optionId: wagerOption?.id || '',
        amount: betInput,
      });
    },
    {
      onSuccess: (newWager) => {
        queryClient.setQueryData<GroupWithBet | undefined>(
          [GROUP_KEY, bet.groupId],
          (og) => {
            og?.bets.find((b) => b.id === bet.id)?.wagers.push(newWager);
            return og;
          },
        );
        onClose();
      },
    },
  );

  const { isLoading: isClosingBet, mutate: closeBet } = useMutation(
    () => {
      return closeBetApi({
        betId: bet.id,
        winningOptionId: selectedOutcome?.id || '',
      });
    },
    {
      onSuccess: (newBet) => {
        queryClient.setQueryData<GroupWithBet | undefined>(
          [GROUP_KEY, bet.groupId],
          (og) => {
            if (!og) {
              console.error('This should never happen');
              return;
            }

            const index = og.bets.findIndex((b) => b.id === bet.id);
            if (!index) {
              console.error('This should never happen');
              return;
            }

            og.bets[index] = newBet;
            return og;
          },
        );
        onClose();
        queryClient.refetchQueries([GET_SCORE])
      },
      
    },
  );

  const handleDelete = () => {
    deleteBet();
  };
  const { isLoading: isDeleting, mutate: deleteBet } = useMutation(
    () => {
      return deleteBetApi(bet.id);
    },
    {
      onSuccess: () => {
        queryClient.setQueryData<GroupWithBet | undefined>(
          [GROUP_KEY, bet.groupId],
          (og) => {
            if (!og) {
              console.error('This should never happen');
              return;
            }

            const index = og.bets.findIndex((b) => b.id === bet.id);
            if (!index) {
              console.error('This should never happen');
              return;
            }
            
            og.bets.splice(index, 1);
            return og;
          },
        );
        onClose();
      },
    },
  );

  const hasPlacedWager = !!bet.wagers.find((w) => w.user.id === auth.user?.id);
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
        {!hasPlacedWager && (
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
              key={`wager-${w.user.displayName}-${w.option.name}-${w.amount}`}
              variant="body1"
            >
              {w.user.displayName} - {w.option.name} - {w.amount}
            </Typography>
          );
        })}
      </Box>

      {hasPlacedWager && (
        <>
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
      )}
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

      <LoadingButton
        variant="outlined"
        sx={optionButtonStyle}
        onClick={() => {
          closeBet();
        }}
        loading={isClosingBet}
      >
        Yes
      </LoadingButton>
      <LoadingButton variant="outlined" loading={isClosingBet}>No</LoadingButton>
    </>
  );

  const handleAddWager = () => {
    addWager();
  };

  return (
    <>
      <Modal open onClose={onClose}>
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

          <LoadingButton
            variant="outlined"
            onClick={handleAddWager}
            sx={optionButtonStyle}
            loading={isAddingWager}
          >
            Yes
          </LoadingButton>
          <LoadingButton
            variant="outlined"
            onClick={() => {
              setIsWagerConfirmOpen(false);
            }}
            loading={isAddingWager}
          >
            No
          </LoadingButton>
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

          <LoadingButton
            variant="outlined"
            sx={{
              backgroundColor: 'error.main',
              color: 'error.contrastText',
              marginRight: '1em',
            }}
            onClick={handleDelete}
            loading={isDeleting}
          >
            Yes
          </LoadingButton>
          <LoadingButton
            variant="outlined"
            onClick={() => {
              setIsConfirmDelete(false);
            }}
            loading={isDeleting}
          >
            No
          </LoadingButton>
        </Box>
      </Modal>
    </>
  );
};
