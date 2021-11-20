import { Box } from '@mui/material'
import { useQuery } from 'react-query';
import React from 'react';
import { getFriends } from '../../../api/friend';
import { Modal } from '../../../components/Modal'

interface Props {
    onClose: () => void;
}
export const CreateGroupModal: React.FC<Props> = ({ onClose }) => {
    const { data: friends } = useQuery(FRIENDS_KEY, getFriends);

    return (
        <Modal
          onClose={() => onClose()}
          aria-labelledby="modal-create-group"
        >
          <Box component="form">

          </Box>
        </Modal>
    )
}

const FRIENDS_KEY = `${CreateGroupModal.name}_FRIENDS`;

