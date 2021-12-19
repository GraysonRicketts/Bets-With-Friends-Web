import {
  Typography,
  Container
} from '@mui/material';
import React from 'react';
import { AddFriend } from './AddFriend';
import { FriendsList } from './PendingRequests';

export const Friends: React.FC = () => {
  

  return (
    <Container component="main">
      <Typography variant="h6" component="h2">
        Friends
      </Typography>

      <AddFriend />
      <FriendsList />
    </Container>
  );
};
