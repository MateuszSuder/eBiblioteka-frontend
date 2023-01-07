import React from 'react';
import {Grid, IconButton, Typography} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const UserInfoPersonalDataSummary = ({ setShowForm }) => {
    return (
        <>
            <Grid
                item
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Typography variant="h6">
                    Imię Nazwisko
                </Typography>
            </Grid>

            <Grid item>
                <IconButton
                    onClick={() =>
                        setShowForm((prev) => !prev)
                    }
                >
                    <EditOutlinedIcon />
                </IconButton>
            </Grid>
        </>
    );
};

export default UserInfoPersonalDataSummary;