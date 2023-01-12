import React from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const UserInfoPersonalDataSummary = ({ setShowForm }) => {
    return (
        <>
            <Grid
                item
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Typography variant="h6">Imię Nazwisko</Typography>
            </Grid>

            <Grid item>
                <IconButton onClick={() => setShowForm((prev) => !prev)}>
                    <EditIcon />
                </IconButton>
            </Grid>
        </>
    );
};

export default UserInfoPersonalDataSummary;
