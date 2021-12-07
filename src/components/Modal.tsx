import { Box, Modal as MuiModal } from '@mui/material';


const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '1px solid lightgray',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
  };

interface Props  { 
    onClose: () => void;
    props?: unknown;
}
export const Modal: React.FC<Props> = ({ onClose, children, ...props }) => {
    return <MuiModal open onClose={onClose} {...props}>
        <Box sx={modalStyle}>
            {children}
        </Box>
    </MuiModal>
}