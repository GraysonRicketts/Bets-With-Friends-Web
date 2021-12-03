import { Box, CircularProgress, Tab, Tabs, Typography } from '@mui/material';
import React, { ReactElement, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { Bet } from '../../../api/bet';
import { getGroupWithBet, GroupWithBet } from '../../../api/group';
import { CategorizedBets } from './CategorizedBets';
import { PlacedBets } from './PlacedBets';
import { ScoreScreen } from './ScoreScreen';

interface Tab {
  label: string;
  value: string;
  component: (bets: Bet[]) => ReactElement;
}

const tabs: Tab[] = [
  { value: 'bets', label: 'Bets', component: (bets: Bet[]) => <PlacedBets bets={bets} /> },
  {
    label: 'Categories',
    value: 'categories',
    component: (bets: Bet[]) => <CategorizedBets bets={bets} />,
  },
  { label: 'Score', value: 'score', component: (bets: Bet[]) => <ScoreScreen bets={bets} /> },
];

export const Group: React.FC = () => {
  const { id } = useParams();

  const [tab, setTab] = useState(tabs[0].value);

  const { isLoading, data: group } = useQuery([GROUP_KEY, id], () =>
    getGroupWithBet(id || ''),
  );

  const handleTabChange = (_: React.SyntheticEvent, tabValue: string) => {
    setTab(tabValue);
  };

  return (
    <>
      {group && (
        <>
          <Typography variant="h6" component="h2" sx={{ marginBottom: '.5em' }}>
            {group.name}
          </Typography>

          <Tabs
            value={tab}
            variant="fullWidth"
            onChange={handleTabChange}
            aria-label="group nav tab"
          >
            {tabs.map((t) => (
              <Tab value={t.value} label={t.label} />
            ))}
          </Tabs>

          <Box
            sx={{
              paddingTop: '1em',
              marginTop: '1em',
            }}
          >
            {tabs.find((t) => t.value === tab)?.component(group.bets)}
          </Box>
        </>
      )}
      {isLoading && <CircularProgress />}
    </>
  );
};

const GROUP_KEY = `${Group.name}_GROUP`;
