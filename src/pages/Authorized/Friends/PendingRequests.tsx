import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import React from 'react'
import { useQuery } from 'react-query'

export const PendingRequests = () => {
    // const [data] = useQuery()
    return (
        <Accordion>
        <AccordionSummary>Requests pending</AccordionSummary>
        <AccordionDetails>
          {/* List of friend requests */}
        </AccordionDetails>
      </Accordion>
    )
}
