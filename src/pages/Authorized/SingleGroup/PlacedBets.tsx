import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import { ButtonRow } from 'src/components/ButtonRow';
import { EditBetModal } from './modals/EditBetModal';
import { useAuth } from 'src/app/auth';
import { ViewOnlyModal } from './modals/ViewOnlyModal';
import { Bet } from 'src/api/bet';
import { GroupWithBet } from 'src/api/group';

interface GroupedBets {
  isPlaced?: boolean;
  isOpen?: boolean;
  bets: Bet[];
}

// TODO: add unit tests
function groupByPlacement(bets: Bet[], userId: string): GroupedBets[] {
  const groupedBets: GroupedBets[] = [
    { isPlaced: true, isOpen: true, bets: [] },
    { isPlaced: false, isOpen: true, bets: [] },
    { isOpen: false, bets: [] },
  ];

  bets.forEach((b) => {
    if (b.closedAt) {
      groupedBets.find((gb) => !gb.isOpen)?.bets.push(b);
    } else if (b.wagers.find((w) => w.user.id === userId)) {
      groupedBets.find((gb) => gb.isPlaced)?.bets.push(b);
    } else {
      groupedBets.find((gb) => !gb.isPlaced && gb.isOpen)?.bets.push(b);
    }
  });

  return groupedBets;
}


export const PlacedBets: React.FC<{ group: GroupWithBet}> = ({group}) => {
  const auth = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editBet, setEditBet] = useState<Bet | undefined>();
  const [isViewOnlyModalOpen, setIsViewOnlyModalOpen] = useState(false);
  const [viewOnlyBet, setViewOnlyBet] = useState<Bet | undefined>();
  const groupedBets = groupByPlacement(group.bets, auth.user?.id || '');

  return (
    <>
      <Box sx={{ marginBottom: '3em' }}>
        <Typography variant="subtitle1">Unplaced</Typography>

        {groupedBets
          .find((gb) => !gb.isPlaced)
          ?.bets.map((b) => {
            return (
              <ButtonRow
                onClick={() => {
                  setIsEditModalOpen(true);
                  setEditBet(b);
                }}
                sx={
                  {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                  } as const
                }
                key={`bets_${b.id}`}
              >
                <Typography>{b.title}</Typography>
              </ButtonRow>
            );
          })}
      </Box>

      <Box sx={{ marginBottom: '3em' }}>
        <Typography variant="subtitle1">Pending</Typography>

        {groupedBets
          .find((gb) => gb.isPlaced)
          ?.bets.map((b) => {
            return (
              <ButtonRow
                onClick={() => {
                  setIsEditModalOpen(true);
                  setEditBet(b);
                }}
              >
                <Typography>{b.title}</Typography>
              </ButtonRow>
            );
          })}
      </Box>

      <Box>
        <Typography variant="subtitle1">Closed</Typography>

        {groupedBets
          .find((gb) => !gb.isOpen)
          ?.bets.map((b) => {
            return (
              <ButtonRow
              key={`gb_${b.id}`}
                onClick={() => {
                  setViewOnlyBet(b);
                  setIsViewOnlyModalOpen(true);
                }}
                sx={
                  {
                    backgroundColor: 'grey.400',
                  } as const
                }
              >
                <Typography>{b.title}</Typography>
              </ButtonRow>
            );
          })}
      </Box>

      {viewOnlyBet && (
        <ViewOnlyModal
          bet={viewOnlyBet}
          isOpen={isViewOnlyModalOpen}
          onClose={() => {
            setIsViewOnlyModalOpen(false);
          }}
        />
      )}
      {editBet && isEditModalOpen && (
        <EditBetModal
          bet={editBet}
          onClose={() => {
            setIsEditModalOpen(false);
          }}
        />
      )}
    </>
  );
};
