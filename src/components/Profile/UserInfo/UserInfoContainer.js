import React from 'react';
import {Grid, Typography} from "@mui/material";

const UserInfoContainer = ({title, children}) => {
    return (
        <>
            <Typography variant="h5" pb={3}>
                {title}
            </Typography>
            <Grid
                container
                item
                sx={{ p: 2, border: "1px solid #e5e5e5" }}
                justifyContent="space-between"
            >
                {children}
            </Grid>
        </>
    );
};

export default UserInfoContainer;