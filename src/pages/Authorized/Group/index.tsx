import { Box, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import { useParams, useResolvedPath } from 'react-router';
import { Link as RouterLink, useLocation, Outlet, useMatch } from 'react-router-dom';
import { fakedGroup } from '../../../app/fakedData';

export const Groups: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const resolved = useResolvedPath(location.pathname);
  const match = useMatch({ path: 'group/:id/*', end: true });

  const url = `/group/${id}`;

  const group = fakedGroup.id === id ? fakedGroup : null;

  return (
    group && (
      <>
        <Typography variant="h6" component="h2" sx={{ marginBottom: '.5em' }}>
          {group.name}
        </Typography>

        <Tabs value={match?.params['*']} variant="fullWidth" aria-label="group nav tab">
          <Tab
            label="Bets"
            value="bets"
            to={`${url}/bets`}
            component={RouterLink}
          />
          <Tab
            label="Categories"
            value="categories"
            to={`${url}/categories`}
            component={RouterLink}
          />
          <Tab
            label="Score"
            value="score"
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
          <Outlet />
        </Box>
      </>
    )
  );
};
