import React from "react";
import { Grid, Paper } from "@mui/material";
import LoginForm from "./LoginForm";

const Login = () => {
    return (
        <Grid
            justifyContent="center"
            alignItems="center"
            sx={{ position: "absolute", width: "100vw", height: "100vh" }}
            container
        >
            <Grid item width="40%">
                <Paper elevation={8}>
                    <LoginForm />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Login;
