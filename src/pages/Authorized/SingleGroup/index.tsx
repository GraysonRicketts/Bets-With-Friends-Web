import { Box, CircularProgress, Tab, Tabs, Typography } from '@mui/material';
import React, { createContext, ReactElement, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { Bet } from 'src/api/bet';
import { getGroupWithBet, GroupWithBet } from 'src/api/group';
import { CategorizedBets } from './CategorizedBets';
import { PlacedBets } from './PlacedBets';
import { ScoreScreen } from './ScoreScreen';

interface Tab {
  label: string;
  value: string;
  component: ReactElement;
}

const tabs: Tab[] = [
  { value: 'bets', label: 'Bets', component:  <PlacedBets /> },
  {
    label: 'Categories',
    value: 'categories',
    component: <CategorizedBets />,
  },
  { label: 'Score', value: 'score', component:  <ScoreScreen /> },
];

// Forcing default value since we will load the group in with bet later and pass
// it in the context. Not the best but...:shrug:
export const GroupContext = createContext<GroupWithBet>({} as GroupWithBet);

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
            <GroupContext.Provider value={group}>
              {tabs.find((t) => t.value === tab)?.component}
            </GroupContext.Provider>
          </Box>
        </>
      )}
      {isLoading && <CircularProgress />}
    </>
  );
};

export const GROUP_KEY = `${Group.name}_GROUP`;
