import { Box, Typography } from '@mui/material';
import React from 'react';
import { Redirect, Route, useParams, useRouteMatch } from 'react-router';
import { NavLink, Switch } from 'react-router-dom';
import { fakedGroup } from '../../app/fakedData';
import { CategorizedBets } from './CategorizedBets';
import { PlacedBets } from './PlacedBets';

export const Group: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { url } = useRouteMatch();

    const group = fakedGroup.id === id ? fakedGroup : null;

    return group && <>
        <Typography>{group.name}</Typography>
        <NavLink to={`${url}/bets`}>Bets</NavLink>
        <NavLink to={`${url}/categories`}>Categories</NavLink>
        <NavLink to={`${url}/score`}>Score</NavLink>

        <Box sx={{ paddingTop: '1em', marginTop: '1em', borderTop: '1px solid lightgray'}}>
            <Switch>
                <Route path={`${url}/bets`}><PlacedBets bets={group.bets} /></Route>
                <Route path={`${url}/categories`}><CategorizedBets bets={group.bets} /></Route>
                <Route path={`${url}/score`}>things</Route>
                <Redirect to={`${url}/bets`} />
            </Switch>
        </Box>
    </>
}