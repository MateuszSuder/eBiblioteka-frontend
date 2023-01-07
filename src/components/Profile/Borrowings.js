import React from "react";
import { Grid, Typography, Box } from "@mui/material";

const Borrowings = () => {
    return (
        <Grid container spacing={3} pt={3}>
            <Grid container item xs={4} direction="column">
                <Typography variant="h5" pb={3}>
                    Dane Osobowe
                </Typography>
                <Box sx={{ p: 2, border: "0.5px solid grey" }}></Box>
            </Grid>
        </Grid>
    );
};

export default Borrowings;
