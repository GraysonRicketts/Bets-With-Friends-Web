import { Box, CircularProgress, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { getGroupWithBet } from 'src/api/group';
import { CategorizedBets } from './CategorizedBets';
import { PlacedBets } from './PlacedBets';
import { ScoreScreen } from './ScoreScreen';

interface LabelValue {
  label: string;
  value: string;
}

const tabs: LabelValue[] = [
  { value: 'bets', label: 'Bets'},
  {
    label: 'Categories',
    value: 'categories',
  },
  { label: 'Score', value: 'score'},
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
              <Tab value={t.value} label={t.label} key={`tab_${t.value}`} />
            ))}
          </Tabs>

          <Box
            sx={{
              paddingTop: '1em',
              marginTop: '1em',
            }}
          >
              {tab === 'bets' && <PlacedBets group={group} />}
              {tab === 'categories' && <CategorizedBets group={group} />}
              {tab === 'score' && <ScoreScreen group={group} />}
          </Box>
        </>
      )}
      {isLoading && <CircularProgress />}
    </>
  );
};

export const GROUP_KEY = `${Group.name}_GROUP`;
