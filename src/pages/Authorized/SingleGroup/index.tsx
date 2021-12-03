import { Box, CircularProgress, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { getGroupWithBet } from '../../../api/group';

export const Group: React.FC = () => {
  const { id } = useParams();

  const { isLoading, data: group } = useQuery([GROUP_KEY, id], () =>
    getGroupWithBet(id || ''),
  );

  return (
    <>
      {group && (
        <>
          <Typography variant="h6" component="h2" sx={{ marginBottom: '.5em' }}>
            {group.name}
          </Typography>

          <Tabs value={'bets'} variant="fullWidth" aria-label="group nav tab">
            <Tab value="bets" label="Bets" />
            <Tab label="Categories" value="categories" />
            <Tab label="Score" value="score" />
          </Tabs>

          <Box
            sx={{
              paddingTop: '1em',
              marginTop: '1em',
            }}
          ></Box>
        </>
      )}
      {isLoading && <CircularProgress />}
    </>
  );
};

const GROUP_KEY = `${Group.name}_GROUP`;
