import { ButtonBase } from "@mui/material"
import React from "react"

interface Props {
    onClick: () => void;
}
export const ButtonRow: React.FC<Props> = ({ onClick, children }) => {
    return <ButtonBase
            sx={{
                borderRadius: 3,
                border: '1px solid dimgray',
                padding: '1em',
                width: '100%',
                justifyContent: 'space-between'
            }}
            onClick={onClick}>
            {children}
        </ButtonBase>
}