import {
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListSubheader,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  acceptFriendReq,
  cancelFriendReq,
  unfriend as unfriendApi,
  getFriendReqs,
  getFriends,
} from '../../../api/friend';
import { LoadingButton } from '@mui/lab';

export const FriendsList = () => {
  const queryClient = useQueryClient();
  const { data: reqs, isLoading: isReqLoading, refetch: refetchReqs } = useQuery(
    REQUESTS_KEY,
    getFriendReqs,
  );
  const { isLoading: isAcceptLoading, mutate: acceptFriend } = useMutation(
    ACCEPT_KEY,
    acceptFriendReq,
    {
      onSuccess: (_, requestId) => {
        // Removes the friend from the pending requests list
        const filteredTo = reqs?.to.filter((r) => r.id !== requestId);
        queryClient.setQueryData(REQUESTS_KEY, { ...reqs, to: filteredTo });
      },
    },
  );

  const { data: friends, isLoading: isFriendLoading, refetch: refetchFriends } = useQuery(
    FRIEND_KEY,
    getFriends,
  );

  const handleAccept = (requestId: string) => {
    acceptFriend(requestId);
  };

  const { mutate: cancelReq } = useMutation('delete_req', cancelFriendReq, { onSuccess: () => {
    refetchReqs();
  }});
  const { mutate: unfriend } = useMutation('unfriend', unfriendApi, { onSuccess: () => {
    refetchFriends();
  }});

  return (
    <Box>
      {isReqLoading && <CircularProgress />}
      <List>
        <ListSubheader>Friends ({friends?.length})</ListSubheader>
        {isFriendLoading && <CircularProgress />}
        {friends &&
          friends.map((f) => {
            return (
              <ListItem
                key={`friend_${f.id}`}
                secondaryAction={
                  <>
                    <Button
                      size="small"
                      onClick={() => {
                        unfriend(f.id);
                      }}
                    >
                      <Close />
                    </Button>
                  </>
                }
                disableGutters
              >
                <ListItemText primary={f.friend.displayName} />
              </ListItem>
            );
          })}

        <ListSubheader>
          Received friend requests ({reqs?.to.length})
        </ListSubheader>
        {isReqLoading && <CircularProgress />}
        {reqs &&
          reqs.to.map((r) => {
            return (
              <ListItem
                key={`to_${r.id}`}
                secondaryAction={
                  <>
                    <Button
                      size="small"
                      onClick={() => {
                        cancelReq(r.id);
                      }}
                    >
                      <Close />
                    </Button>
                  </>
                }
                disableGutters
              >
                <LoadingButton
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={() => handleAccept(r.id)}
                  sx={{ mr: 1 }}
                  loading={isAcceptLoading}
                >
                  Accept
                </LoadingButton>
                <ListItemText
                  primary={
                    <Typography component="p" variant="body1">
                      {r.userFrom.email}
                    </Typography>
                  }
                />
              </ListItem>
            );
          })}

        <ListSubheader>
          Sent friend requests ({reqs?.from.length})
        </ListSubheader>
        {isReqLoading && <CircularProgress />}
        {reqs &&
          reqs.from.map((r) => {
            return (
              <ListItem
                key={`from_${r.id}`}
                secondaryAction={
                  <>
                    <Button
                      size="small"
                      onClick={() => {
                        unfriend(r.id);
                      }}
                    >
                      <Close />
                    </Button>
                  </>
                }
                disableGutters
              >
                <ListItemText primary={r.userTo.email} />
              </ListItem>
            );
          })}
      </List>
    </Box>
  );
};

const REQUESTS_KEY = `${FriendsList.name}_requests`;
const ACCEPT_KEY = `${FriendsList.name}_accept`;
const FRIEND_KEY = `${FriendsList.name}_friends`;
