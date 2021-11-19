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
import { useQuery } from 'react-query';
import { getFriendReqs } from '../../../api/friend';

export const PendingRequests = () => {
  const { data: reqs, isLoading } = useQuery('requests', getFriendReqs);

  const handleAccept = () => {
    // TODO
  };

  const handleDelete = () => {};

  return (
    <Box>
      {isLoading && <CircularProgress />}
      {reqs && (
        <List>
          <ListSubheader>Pending requests ({reqs.to.length})</ListSubheader>
          {reqs.to.map((r) => {
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
                  onClick={handleAccept}
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
          <ListSubheader>Awaiting ({reqs.from.length})</ListSubheader>
          {reqs.from.map((r) => {
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
                    <Typography component="p" variant="body1">
                      {r.userTo.email}
                    </Typography>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      )}
    </Box>
  );
};
