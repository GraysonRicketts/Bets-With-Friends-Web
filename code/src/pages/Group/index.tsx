import { Box, Container, Paper, Typography } from '@mui/material';
import React from 'react';
import { Redirect, Route, useParams, useRouteMatch } from 'react-router';
import { NavLink, Switch } from 'react-router-dom';
import { fakedGroup } from '../../fakedData';
import { Bets } from './Bets';

export const Group: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { path, url } = useRouteMatch();

    const group = fakedGroup.id === id ? fakedGroup : null;

    return group && <>
        <Typography>{group.name}</Typography>
        <NavLink to={`${url}/bets`}>Bets</NavLink>
        <NavLink to={`${url}/categories`}>Categories</NavLink>
        <NavLink to={`${url}/score`}>Score</NavLink>

        <Box sx={{ paddingTop: '1em'}}>
            <Switch>
                <Route path={`${url}/bets`}><Bets bets={group.bets} /></Route>
                <Route path={`${url}/categories`}>no</Route>
                <Route path={`${url}/score`}>things</Route>
                <Redirect to={`${url}/bets`} />
            </Switch>
        </Box>
    </>
}