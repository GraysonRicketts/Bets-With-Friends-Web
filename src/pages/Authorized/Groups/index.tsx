import { Box, CircularProgress, Fab, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonRow } from '../../../components/ButtonRow';
import { CreateGroupModal } from './CreateGroupModal';
import { getGroups, Group } from '../../../api/group';
import { useQuery } from 'react-query';

export const Groups: React.FC = () => {
  const [state, setState] = useState({
    isModalOpen: false,
  });
  const {isLoading, data: groups} = useQuery(GROUPS_KEY, getGroups);
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
        {groups && groups.map((g: Group) => {
          return (
            <ButtonRow
              onClick={() => {
                navigate(`/group/${g.id}`);
              }}
              key={`/group/${g.id}`}
            >
              <Typography>{g.name}</Typography>
              <Typography>{g.userGroups.length} Memebers</Typography>
            </ButtonRow>
          );
        })}
        {isLoading && <CircularProgress />}
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

export const GROUPS_KEY = `${Groups.name}_GROUPS`;