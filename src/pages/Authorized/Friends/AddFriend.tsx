import React, { useState } from 'react';
import {
  Fab,
  Container,
  Box,
  FormControl,
  InputLabel,
  FormHelperText,
  Input
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useMutation } from 'react-query';
import { addFriend as addFriendApiCall } from '../../../api/friend';

export const AddFriend: React.FC = () => {
  const [email, setEmail] = useState('');
  const { isError, isLoading, mutate: addFriend  } = useMutation(() => addFriendApiCall(email), {
      onSuccess: () => {
          setEmail('');
      },
      onError: (error) => {
        console.error(error);
      }
  });
  
  const handleAddFriend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addFriend();
  };
  
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.currentTarget.value)
  };

  return (
    <Container sx={{ ml: 0, mb: 2, mt: 3, pl: 0 }}>
      <Box
        component="form"
        onSubmit={handleAddFriend}
        sx={{ display: 'flex', flexDirection: 'row',
        alignItems: 'center', }}
      >
        <Fab disabled={isLoading} color="primary" variant="extended" type="submit" size="small" sx={{mr: 1}}>
          <Add />
          Add friend
        </Fab>
        <FormControl>
          <InputLabel htmlFor="friend-email">Email*</InputLabel>
          <Input
            id="friend-email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            error={isError}
            autoFocus
          />
          {isError && <FormHelperText id="request-failed">Something went wrong. Please, try again.</FormHelperText>}
        </FormControl>
      </Box>
    </Container>
  );
};
