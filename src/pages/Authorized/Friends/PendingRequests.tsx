import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import { useQuery } from 'react-query';
import { getFriendReqs } from '../../../api/friend';

export const PendingRequests = () => {
  const { data: reqs, isLoading } = useQuery('requests', getFriendReqs);
  console.log('here');
  

  const handleAccept = () => {
    // TODO
  };

  const handleDelete = () => {

  }

  return (
    <Accordion>
      <AccordionSummary>Requests pending ({reqs?.from.length || 0})</AccordionSummary>
      <AccordionDetails>
        {isLoading && <CircularProgress />}
        {reqs && (
          <Box>
            <Box>
              <List>
                {reqs.from.map((r) => {
                  <ListItem
                    key={r.id + r.createdAt}
                    secondaryAction={
                      <>
                        <Button color="success" onClick={handleAccept}>Accept</Button>
                        <Button onClick={handleDelete}>Reject</Button>
                      </>
                    }
                  >
                    <Typography>{r.userFrom}</Typography>
                  </ListItem>;
                })}
              </List>
            </Box>
            <Box>
              <Typography>Waiting to be accepted</Typography>
            </Box>
          </Box>
        )}
        {/* List of friend requests */}
      </AccordionDetails>
    </Accordion>
  );
};
