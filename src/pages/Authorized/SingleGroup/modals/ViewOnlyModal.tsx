import { Box, Modal, Typography } from '@mui/material';
import { Bet } from 'src/api/bet';
import { modalStyle } from './modalStyle';

interface Props {
  bet: Bet;
  isOpen: boolean;
  onClose: () => void;
}

export const ViewOnlyModal: React.FC<Props> = ({ bet, isOpen, onClose }) => {
  const finalOption = bet.options.find(o => o.isFinalOption);
  if (!finalOption) {
    console.error('should never happen');
    return <></>
  }


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
          Final outcome: {finalOption.name}
        </Typography>

        {bet.wagers.map((w) => {
          return (
            <Typography
              variant="body1"
              key={`wager-${w.user.displayName}-${w.option.name}-${w.amount}`}
            >
              {w.user.displayName} - {w.option.name} - {w.amount}
            </Typography>
          );
        })}

        <Typography>Outcome: {finalOption.name}</Typography>
      </Box>
    </Modal>
  );
};
