import React from 'react';
import {styled, Typography} from "@mui/material";

const TypographyLink = styled(Typography)`
  ${({theme}) => `
    cursor: pointer;
    transition: all 0.15s;
    &:hover {
        color: ${theme.palette.primary.main}
    }
  `}
`

export default TypographyLink;