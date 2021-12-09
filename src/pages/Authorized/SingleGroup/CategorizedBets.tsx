import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { ButtonRow } from 'src/components/ButtonRow';
import { EditBetModal } from './modals/EditBetModal';
import { Bet, Category } from 'src/api/bet';
import { GroupWithBet } from 'src/api/group';
import { useAuth } from 'src/app/auth';

interface GroupedBets {
  category: Category | undefined;
  bets: Bet[];
}

// TODO: Add unit tests
function groupByCategory(bets: Bet[]): GroupedBets[] {
  const groupedBets: GroupedBets[] = [];

  bets.forEach((b) => {
    const categoryGroup = groupedBets.find(
      (gb) =>
        (!gb.category && !b.category) || gb.category?.id === b.category?.id,
    );
    if (categoryGroup) {
      categoryGroup.bets.push(b);
    } else {
      groupedBets.push({ category: b.category || undefined, bets: [b] });
    }
  });

  return groupedBets;
}

function getWagerStyle(bet: Bet, userId: string) {
  if (bet.closedAt) {
    return { backgroundColor: 'grey.400' } as const;
  }

  const isWagerPlaced = bet.wagers.find((w) => w.user.id === userId);
  if (isWagerPlaced) {
    return {} as const;
  }

  return {
    backgroundColor: 'primary.main',
    color: 'primary.contrastText',
  } as const;
}

export const CategorizedBets: React.FC<{ group: GroupWithBet }> = ({
  group,
}) => {
  const categorizedBets = groupByCategory(group.bets);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editBet, setEditBet] = useState<Bet | undefined>(undefined);
  const auth = useAuth();

  return (
    <>
      {categorizedBets.map((gb) => {
        return (
          <Box key={`gb_bets_${gb.category?.id}`} sx={{ marginBottom: '3em' }}>
            <Typography>{gb.category?.name || 'Uncategorized'}</Typography>

            {gb.bets.map((b) => {
              return (
                <ButtonRow
                  onClick={() => {
                    setIsEditModalOpen(true);
                    setEditBet(b);
                  }}
                  sx={getWagerStyle(b, auth.user?.id || '')}
                  key={`categorized_bet_title_${b.id}`}
                >
                  <Typography>{b.title}</Typography>
                </ButtonRow>
              );
            })}
          </Box>
        );
      })}
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
