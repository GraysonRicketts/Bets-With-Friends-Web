import { ButtonBase, Typography } from '@mui/material';
import React from "react"
import { Link } from 'react-router-dom';
import { fakedGroup } from '../fakedData';
import { Group } from "../interfaces";


export const Home: React.FC = () => {
    const groups: Group[] = [fakedGroup];

    return <>{
        groups.map(g => {
            return (
                <Link to={`/group/${g.id}/bets`} key={`/group/${g.id}/bets`}>
                <ButtonBase
                    sx={{
                        borderRadius: 3,
                        border: '1px solid dimgray',
                        padding: '1em',
                        width: '100%',
                        justifyContent: 'space-between'
                    }}>
                    <Typography>{g.name}</Typography>
                    <Typography>{g.members.length} Friends</Typography>
                    <Typography>
                        {g.bets.length} Bets</Typography>
                </ButtonBase></Link>
            )
        })
    }</>;
}