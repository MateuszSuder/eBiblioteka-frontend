import React from "react";
import {Grid, IconButton, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import useAuth from "../../../../context/AuthProvider";

const UserInfoPersonalDataSummary = ({ setShowForm }) => {
    const {user} = useAuth();

    return (
        <>
            <Grid
                item
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Typography variant="h6">{user.name} {user.lastName}</Typography>
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
