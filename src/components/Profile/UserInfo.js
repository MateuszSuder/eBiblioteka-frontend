import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

const UserInfo = () => {
    const [personalData, editPersonalData] = useState("");
    const [password, changePassword] = useState("");
    return (
        <Grid container spacing={3} pt={3}>
            <Grid container item xs={4} direction="column">
                <Typography variant="h5" pb={3}>
                    Dane Osobowe
                </Typography>
                <Box sx={{ p: 2, border: "0.5px solid grey" }}>
                    <Button onClick={editPersonalData}>asd</Button>
                </Box>
            </Grid>
            <Grid container item xs={2} direction="column">
                <Typography variant="h5" pb={3}>
                    Zmiana hasła
                </Typography>
                <Box sx={{ p: 2, border: "0.5px solid grey" }}></Box>
            </Grid>
        </Grid>
    );
};

export default UserInfo;
