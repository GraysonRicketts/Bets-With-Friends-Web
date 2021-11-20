import { Box, Fab, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonRow } from '../../components/ButtonRow';
import { Group } from '../../interfaces';

export const Home: React.FC = () => {
  const groups: Group[] = [];
  const navigate = useNavigate();

  const handleCreateGroup = () => {
    
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100% ',
      }}
    >
      <Box>
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
      </Box>
      <Fab variant="extended" color="primary" aria-label="create group" onClick={handleCreateGroup}>
        <AddIcon />
        Create group
      </Fab>
    </Box>
  );
};
