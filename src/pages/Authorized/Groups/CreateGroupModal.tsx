import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import React, { useState } from 'react';
import { getFriends } from 'src/api/friend';
import { createGroup as createGroupApi } from 'src/api/group';
import { Modal } from 'src/components/Modal';
import { AxiosError } from 'axios';
import { GROUPS_KEY } from '.';

interface Props {
  onClose: () => void;
}

interface State {
  groupName: string;
  selectedFriends: string[];
}

export const CreateGroupModal: React.FC<Props> = ({ onClose }) => {
  const { data: friends, isLoading } = useQuery(FRIENDS_KEY, getFriends);
  const [{ groupName, selectedFriends }, setState] = useState<State>({
    groupName: '',
    selectedFriends: [],
  });

  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createGroup } = useMutation(
    () => createGroupApi({ name: groupName, members: selectedFriends }),
    {
      onSuccess: () => {
        queryClient.refetchQueries([GROUPS_KEY]);
        onClose();
      },
      onError: (e) => {
        const ae = e as AxiosError;
        if (ae.isAxiosError) {
          console.error(ae.response?.data.message);
        } else {
          console.error(e);
        }
      }
    },
  );

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ selectedFriends, groupName: event.currentTarget.value });
  };

  const handleFriendChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    // On autofill we get the stringified value.
    const newList = typeof value === 'string' ? value.split(',') : value;
    setState({ groupName, selectedFriends: newList });
  };

  const handleCreateGroup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createGroup();
  };

  return (
    <Modal onClose={() => onClose()} aria-labelledby="modal-create-group">
      {isCreating ? (
        <Box>
          <CircularProgress />
          <Typography>Creating group...</Typography>
        </Box>
      ) : (
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column' }}
          onSubmit={handleCreateGroup}
        >
          <Typography variant="h6" component="h3" gutterBottom>
            Create a group
          </Typography>
          <FormControl sx={{ mb: 2 }}>
            <InputLabel htmlFor="group-name">Group name*</InputLabel>
            <OutlinedInput
              id="group-name"
              label="Group name*"
              value={groupName}
              onChange={handleNameChange}
              required
              autoFocus
            />
          </FormControl>

          {isLoading && <CircularProgress />}
          {friends && (
            <FormControl>
              <InputLabel htmlFor="friends-to-add">Friends to add</InputLabel>
              <Select
                id="friends-to-add"
                multiple
                value={selectedFriends}
                onChange={handleFriendChange}
                input={
                  <OutlinedInput id="select-friends" label="Frieds to add" />
                }
                renderValue={(selected) => (
                  <Box>
                    {selected.map((friendId) => (
                      <Chip
                        key={`${friendId}_to_add`}
                        label={
                          friends.find((f) => f.friend.id === friendId)?.friend
                            .displayName || 'error'
                        }
                      />
                    ))}
                  </Box>
                )}
              >
                {friends.map((f) => (
                  <MenuItem key={`friend_${f.friend.id}`} value={f.friend.id}>
                    {f.friend.displayName}
                  </MenuItem>
                ))}
              </Select>

              <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                Create Group
              </Button>
            </FormControl>
          )}
        </Box>
      )}
    </Modal>
  );
};

const FRIENDS_KEY = `${CreateGroupModal.name}_FRIENDS`;
