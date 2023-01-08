import {Divider, Grid, Typography} from "@mui/material";
import React from "react";

const BookRow = ({label, value, divider = true}) => {
    if(!label || !value) return (<></>);

    return (
        <>
            <Grid item container xs={12} justifyContent="center" gap={2}>
                <Grid item container xs={5} justifyContent="flex-end" alignItems="center">
                    <Typography fontWeight="bold">
                        {label}
                    </Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography>
                        {value}
                    </Typography>
                </Grid>
            </Grid>
            {
                divider && (
                    <Grid item xs={12} my={1}>
                        <Divider />
                    </Grid>
                )
            }
        </>
    )
}

export default BookRow