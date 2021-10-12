import { Box, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import { Redirect, Route, useParams, useRouteMatch } from 'react-router';
import { Link as RouterLink, Switch } from 'react-router-dom';
import { fakedGroup } from '../../app/fakedData';
import { CategorizedBets } from './CategorizedBets';
import { PlacedBets } from './PlacedBets';
import { ScoreScreen } from './ScoreScreen';

export const Group: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { url } = useRouteMatch();

  // You need to provide the routes in descendant order.
  // This means that if you have nested routes like:
  // users, users/new, users/edit.
  // Then the order should be ['users/add', 'users/edit', 'users'].
  const routeMatch = useRouteMatch([
    '/group/:id/bets',
    '/group/:id/categories',
    '/group/:id/score',
  ]);
  const currentTab = routeMatch?.path;

  const group = fakedGroup.id === id ? fakedGroup : null;

  return (
    group && (
      <>
        <Typography variant="h6" sx={{ marginBottom: '.5em' }}>
          {group.name}
        </Typography>

        <Tabs value={currentTab} variant="fullWidth" aria-label="group nav tab">
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
          <Switch>
            <Route path={`${url}/bets`}>
              <PlacedBets bets={group.bets} />
            </Route>
            <Route path={`${url}/categories`}>
              <CategorizedBets bets={group.bets} />
            </Route>
            <Route path={`${url}/score`}>
              <ScoreScreen group={group} />
            </Route>
            <Redirect to={`${url}/bets`} />
          </Switch>
        </Box>
      </>
    )
  );
};
