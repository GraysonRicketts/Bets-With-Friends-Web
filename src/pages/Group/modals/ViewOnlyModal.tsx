import { Box, Modal, Typography } from '@mui/material';
import { Bet } from '../../../interfaces';
import { modalStyle } from './modalStyle';

interface Props {
  bet: Bet;
  isOpen: boolean;
  onClose: () => void;
}

export const ViewOnlyModal: React.FC<Props> = ({ bet, isOpen, onClose }) => {
  return (
    <Modal
      open={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      <Box sx={modalStyle}>
        <Typography variant="h6">{bet.title}</Typography>
        {bet.category && (
          <Typography variant="subtitle2">
            Category: {bet.category.name}
          </Typography>
        )}
        <Typography variant="subtitle2" sx={{ marginBottom: '1em' }}>
          Final outcome: {bet.outcome?.name}
        </Typography>

        {bet.wagers.map((w) => {
          return (
            <Typography
              variant="body1"
              key={`wager-${w.user.name}-${w.option.name}-${w.amount}`}
            >
              {w.user.name} - {w.option.name} - {w.amount}
            </Typography>
          );
        })}

        <Typography>Outcome: {bet.outcome?.name}</Typography>
      </Box>
    </Modal>
  );
};
