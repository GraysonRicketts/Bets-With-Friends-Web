import { ButtonBase } from '@mui/material';
import { SxProps, Theme } from '@mui/system';
import React from 'react';

interface Props {
  onClick: () => void;
  sx?: SxProps<Theme>;
}
export const ButtonRow: React.FC<Props> = ({ onClick, children, sx }) => {
  return (
    <ButtonBase
      sx={{
        borderRadius: 3,
        border: '1px solid dimgray',
        padding: '1em',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: '0.5em',
        ...sx,
      }}
      onClick={onClick}
    >
      {children}
    </ButtonBase>
  );
};
