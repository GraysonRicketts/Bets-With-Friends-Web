import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import { ButtonRow } from '../../../components/ButtonRow';
import { Bet, Category, uuid } from '../../../interfaces';
import AddIcon from '@mui/icons-material/Add';
import { EditBetModal } from './modals/EditBetModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { AddBetModal } from './modals/AddBetModal';
import { ViewOnlyModal } from './modals/ViewOnlyModal';

interface GroupedBets {
  isPlaced?: boolean;
  isOpen?: boolean;
  bets: Bet[];
}

// TODO: add unit tests
function groupByPlacement(bets: Bet[], userId: uuid): GroupedBets[] {
  const groupedBets: GroupedBets[] = [
    { isPlaced: true, isOpen: true, bets: [] },
    { isPlaced: false, isOpen: true, bets: [] },
    { isOpen: false, bets: [] },
  ];

  bets.forEach((b) => {
    if (!b.isOpen) {
      groupedBets.find((gb) => !gb.isOpen)?.bets.push(b);
    } else if (b.wagers.find((w) => w.user.id === userId)) {
      groupedBets.find((gb) => gb.isPlaced)?.bets.push(b);
    } else {
      groupedBets.find((gb) => !gb.isPlaced && gb.isOpen)?.bets.push(b);
    }
  });

  return groupedBets;
}

export const PlacedBets: React.FC = () => {
  const userId = useSelector((state: RootState) => state.user.id);
  const groupedBets = groupByPlacement([], userId);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editBet, setEditBet] = useState<Bet | undefined>();
  const [isViewOnlyModalOpen, setIsViewOnlyModalOpen] = useState(false);
  const [viewOnlyBet, setViewOnlyBet] = useState<Bet | undefined>();

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

        <IconButton
          aria-label="add"
          onClick={() => {
            setIsAddModalOpen(true);
          }}
        >
          <AddIcon />
        </IconButton>
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

        <IconButton
          aria-label="add"
          onClick={() => {
            setIsAddModalOpen(true);
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <Box>
        <Typography variant="subtitle1">Closed</Typography>

        {groupedBets
          .find((gb) => !gb.isOpen)
          ?.bets.map((b) => {
            return (
              <ButtonRow
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
      {editBet && (
        <EditBetModal
          isOpen={isEditModalOpen}
          bet={editBet}
          onClose={() => {
            setIsEditModalOpen(false);
          }}
        />
      )}
      {/* <AddBetModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
        }}
        categories={[]
          .map((b) => b.category)
          .filter((c: Category | undefined): c is Category => {
            return !!c;
          })
          .filter((v, i, pv) => pv.indexOf(v) === i)}
      /> */}
    </>
  );
};
