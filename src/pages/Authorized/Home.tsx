import { Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonRow } from '../../components/ButtonRow';
import { fakedGroup } from '../../app/fakedData';
import { Group } from '../../interfaces';

export const Home: React.FC = () => {
  const groups: Group[] = [fakedGroup];
  const navigate = useNavigate();

  return (
    <>
      {groups.map((g) => {
        return (
          <ButtonRow
            onClick={() => {
              navigate(`/group/${g.id}/bets`);
            }}
            key={`/group/${g.id}/bets`}
          >
            <Typography>{g.name}</Typography>
            <Typography>{g.members.length} Friends</Typography>
            <Typography>{g.bets.length} Bets</Typography>
          </ButtonRow>
        );
      })}
    </>
  );
};
