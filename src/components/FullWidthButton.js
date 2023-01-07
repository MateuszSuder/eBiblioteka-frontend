import React from 'react';
import {Button, styled} from "@mui/material";

const FullWidthButton = styled(Button)`
  ${() => `
    width: 100%
  `}
`

export default FullWidthButton;