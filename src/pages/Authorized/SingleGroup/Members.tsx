import {
  Box,
  CircularProgress,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { GroupWithBet, addMemberToGroup } from 'src/api/group';
import { getFriends, Friend } from 'src/api/friend';
import { Add } from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { GROUP_KEY } from '.';

interface Props {
  group: GroupWithBet;
}
export const Members: React.FC<Props> = ({ group }) => {
  const queryClient = useQueryClient();
  const [newMember, setNewMember] = useState<Friend | undefined>();

  const { data: friends, isLoading: isFriendsLoading } = useQuery(
    FRIENDS_KEY,
    getFriends,
  );
  const { isLoading: isAddingMember, mutate: addMember } = useMutation(
    () => {
      return addMemberToGroup(group.id, newMember!.friend.id);
    },
    {
      onSuccess: (newGrp) => {
        queryClient.setQueryData<GroupWithBet | undefined>(
          [GROUP_KEY, group.id],
          (og) => {
            if (!og) {
              return;
            }
            og.userGroups = newGrp.userGroups;
            return og;
          },
        );
        setNewMember(undefined);
      },
    },
  );
  const handleAddMember = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    addMember();
  };
  const isLoading = isFriendsLoading || isAddingMember;

  const handleFriendChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    const newMmbr = friends?.find((f) => f.friend.id === value);
    if (!newMmbr) {
      console.error('This should never happen', value);
      return;
    }

    setNewMember(newMmbr);
  };

  const possibleNewMembers: Friend[] = useMemo(() => {
    if (!friends) {
      return [];
    }
    const groupUserIds = group.userGroups.map((ug) => ug.user.id);
    return friends.filter((f) => !groupUserIds.includes(f.friend.id));
  }, [group.userGroups, friends]);

  return (
    <>
      <Box
        component="form"
        onSubmit={handleAddMember}
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <FormControl fullWidth>
          {possibleNewMembers.length ? (
            <>
              <InputLabel htmlFor="new-member-to-add">New member*</InputLabel>
              <Select
                id="new-member-to-add"
                value={newMember?.friend.id || ''}
                onChange={handleFriendChange}
                input={
                  <OutlinedInput id="select-new-member" label="New member*" />
                }
                renderValue={(val) => (
                  <Box>
                    {friends?.find((f) => f.friend.id === val)?.friend.displayName}
                  </Box>
                )}
                fullWidth
              >
                {isFriendsLoading ? (
                  <CircularProgress />
                ) : (
                  possibleNewMembers.map((f) => (
                    <MenuItem key={`friend_${f.friend.id}`} value={f.friend.id}>
                      {f.friend.displayName}
                    </MenuItem>
                  ))
                )}
              </Select>
            </>
          ) : (
            'Inivte more friends to add more members'
          )}
        </FormControl>
        <Fab
          color="primary"
          variant="extended"
          type="submit"
          size="large"
          sx={{ ml: 1 }}
          disabled={isLoading || !possibleNewMembers.length}
        >
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <Add />
              Add member
            </>
          )}
        </Fab>
      </Box>
      <Box sx={{ mt: 6, mb: 6 }}>
        <Typography variant="body1">Current members</Typography>
        {group.userGroups.map((ug) => (
          <Typography variant="h6" key={`ugu_${group.id}_${ug.user.id}`}>
            {ug.user.displayName} - {ug.user.score}
          </Typography>
        ))}
      </Box>
    </>
  );
};

const FRIENDS_KEY = `${Members.name}_FRIENDS`;
