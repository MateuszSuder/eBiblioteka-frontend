import React from 'react';
import {Grid, Typography} from "@mui/material";
import FullWidthButton from "./FullWidthButton";

const DualButtonModalContent = ({title, leftAction, leftText, rightAction, rightText}) => {
    return (
        <Grid container justifyContent="center" gap={3} onClick={(e) => e.stopPropagation()}>
            <Grid item xs={12}>
                <Typography align="center" variant="h6">
                    {title}
                </Typography>
            </Grid>
            <Grid item container xs={12} md={8} justifyContent="space-between">
                <Grid item xs={5}>
                    <FullWidthButton variant="outlined" onClick={leftAction}>
                        { leftText }
                    </FullWidthButton>
                </Grid>
                <Grid item xs={5}>
                    <FullWidthButton variant="contained" onClick={rightAction}>
                        { rightText }
                    </FullWidthButton>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default DualButtonModalContent;