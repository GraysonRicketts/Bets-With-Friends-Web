import React, { useState } from 'react';
import {
  Fab,
  Container,
  Box,
  FormControl,
  InputLabel,
  FormHelperText,
  Input,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useMutation } from 'react-query';
import { addFriend as addFriendApiCall } from '../../../api/friend';
import { AxiosError } from 'axios';

interface State {
  email: string;
  errMsg: string;
}

export const AddFriend: React.FC = () => {
  const [{ email, errMsg }, setState] = useState<State>({
    email: '',
    errMsg: '',
  });
  const { isLoading, mutate: addFriend } = useMutation(
    () => addFriendApiCall(email),
    {
      onSuccess: () => {
        setState({ errMsg: '', email: '' });
      },
      onError: (e) => {
        const ae = e as AxiosError;
        if (ae.isAxiosError) {
          setState({ errMsg: ae.response?.data.message, email });
        } else if (e instanceof Error) {
          setState({ errMsg: e.message, email });
        } else {
          console.error(e);
          setState({
            errMsg: 'Something went wrong. Please, try again.',
            email,
          });
        }
      },
    },
  );

  const handleAddFriend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addFriend();
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ errMsg: '', email: event.currentTarget.value });
  };

  return (
    <Container sx={{ ml: 0, mb: 2, mt: 3, pl: 0 }}>
      <Box
        component="form"
        onSubmit={handleAddFriend}
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <Fab
          disabled={isLoading}
          color="primary"
          variant="extended"
          type="submit"
          size="large"
          sx={{ mr: 1 }}
        >
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
            error={!!errMsg}
            autoFocus
          />
          {!!errMsg && (
            <FormHelperText id="request-failed">{errMsg}</FormHelperText>
          )}
        </FormControl>
      </Box>
    </Container>
  );
};
