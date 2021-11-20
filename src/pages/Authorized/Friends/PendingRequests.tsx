import {
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListSubheader,
  ListItemIcon,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { acceptFriendReq, getFriendReqs, getFriends } from '../../../api/friend';

const REQUESTS_KEY = 'requests';
const ACCEPT_KEY = 'accept';
const FRIEND_KEY = 'friends'

export const PendingRequests = () => {
  const queryClient = useQueryClient()
  const { data: reqs, isLoading: isReqLoading } = useQuery(REQUESTS_KEY, getFriendReqs);
  const { data, isLoading: isAcceptLoading, mutate: acceptFriend } = useMutation(ACCEPT_KEY, acceptFriendReq, {
    onSuccess: (_, requestId) => {
      // Removes the friend from the pending requests list
      const filteredTo = reqs?.to.filter(r => r.id !== requestId);
      queryClient.setQueryData(REQUESTS_KEY, { ...reqs, to: filteredTo })
    }
  });

  const { data: friends, isLoading: isFriendLoading } = useQuery(FRIEND_KEY, getFriends)

  const handleAccept = (requestId: string) => {
    acceptFriend(requestId);
  };

  const handleDelete = () => {
  };

  return (
    <Box>
      {isReqLoading && <CircularProgress />}
        <List>
          <ListSubheader>Pending requests ({reqs?.to.length})</ListSubheader>
          {isReqLoading && <CircularProgress />}
          {reqs && reqs.to.map((r) => {
            return (
              <ListItem
                key={`to_${r.id}`}
                secondaryAction={
                  <>
                    <Button size="small" onClick={handleDelete}>
                      <Close />
                    </Button>
                  </>
                }
                disableGutters
              >
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={() => handleAccept(r.id)}
                  sx={{mr: 1}}
                >
                  Accept
                </Button>
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
          <ListSubheader>Friends ({friends?.length})</ListSubheader>
          {isFriendLoading && <CircularProgress />}
          {friends && friends.map((f) => {
            return (
              <ListItem
                key={`friend_${f.id}`}
                secondaryAction={
                  <>
                    <Button size="small" onClick={handleDelete}>
                      <Close />
                    </Button>
                  </>
                }
                disableGutters
              >
                <ListItemText
                  primary={
                  f.friend.displayName
                  }
                />
              </ListItem>
            );
          })}


          <ListSubheader>Awaiting ({reqs?.from.length})</ListSubheader>
          {isReqLoading && <CircularProgress />}
          {reqs && reqs.from.map((r) => {
            return (
              <ListItem
                key={`from_${r.id}`}
                secondaryAction={
                  <>
                    <Button size="small" onClick={handleDelete}>
                      <Close />
                    </Button>
                  </>
                }
                disableGutters
              >
                <ListItemText
                  primary={
                      r.userTo.email
                  }
                />
              </ListItem>
            );
          })}
        </List>
    </Box>
  );
};
