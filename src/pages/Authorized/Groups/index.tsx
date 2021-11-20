import { Box, Fab, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonRow } from '../../../components/ButtonRow';
import { Group } from '../../../interfaces';
import { CreateGroupModal } from './CreateGroupModal';

export const Groups: React.FC = () => {
  const [state, setState] = useState({
    isModalOpen: false,
  });
  const groups: Group[] = [];
  const navigate = useNavigate();

  const toggleCreateGroupModal = () => {
    setState({
      isModalOpen: !state.isModalOpen
    })
  };

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
      <Fab
        variant="extended"
        color="primary"
        aria-label="create group"
        onClick={toggleCreateGroupModal}
      >
        <AddIcon />
        Create group
      </Fab>
      {state.isModalOpen && (
        <CreateGroupModal onClose={toggleCreateGroupModal} />
      )}
    </Box>
  );
};

