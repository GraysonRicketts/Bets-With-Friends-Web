import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Fab,
  Container
} from '@mui/material';
import React from 'react';
import { AddFriend } from './AddFriend';

export const Friends: React.FC = () => {
  

  return (
    <Container component="main">
      <Typography variant="h6" component="h2">
        Friends
      </Typography>

      <AddFriend />

      <Paper>
      {/* List of friends */}
      </Paper>

      <Accordion>
        <AccordionSummary>Requests pending</AccordionSummary>
        <AccordionDetails>
          {/* List of friend requests */}
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};
