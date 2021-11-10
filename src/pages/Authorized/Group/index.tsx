import { Box, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import { Route, useParams } from 'react-router';
import { Link as RouterLink, Routes, useLocation } from 'react-router-dom';
import { fakedGroup } from '../../../app/fakedData';
import { CategorizedBets } from './CategorizedBets';
import { PlacedBets } from './PlacedBets';
import { ScoreScreen } from './ScoreScreen';

export const Group: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();

  const url = `/group/${id}/`;

  const group = fakedGroup.id === id ? fakedGroup : null;

  return (
    group && (
      <>
        <Typography variant="h6" sx={{ marginBottom: '.5em' }}>
          {group.name}
        </Typography>

        <Tabs value={location.pathname} variant="fullWidth" aria-label="group nav tab">
          <Tab
            label="Bets"
            value="/group/:id/bets"
            to={`${url}/bets`}
            component={RouterLink}
          />
          <Tab
            label="Categories"
            value="/group/:id/categories"
            to={`${url}/categories`}
            component={RouterLink}
          />
          <Tab
            label="Score"
            value="/group/:id/score"
            to={`${url}/score`}
            component={RouterLink}
          />
        </Tabs>

        <Box
          sx={{
            paddingTop: '1em',
            marginTop: '1em',
          }}
        >
          <Routes>
            <Route path={`${url}/bets`} element={<PlacedBets bets={group.bets} />}/>
            <Route path={`${url}/categories`} element={<CategorizedBets bets={group.bets} />}/>
            <Route path={`${url}/score`} element={<ScoreScreen group={group} />}/>
          </Routes>
        </Box>
      </>
    )
  );
};
