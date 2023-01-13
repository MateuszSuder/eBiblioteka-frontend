import React from "react";
import {Grid} from "@mui/material";
import UserInfoPassword from "./UserInfoPassword/UserInfoPassword";
import UserInfoPersonalData from "./UserInfoPersonalData/UserInfoPersonalData";
import useAuth from "../../../context/AuthProvider";
import {Navigate} from "react-router-dom";

const UserInfo = () => {
    const { user } = useAuth();

    if(!user) return (
        <Navigate to="/login" />
    )

    return (
        <Grid container spacing={3} pt={3}>
            <UserInfoPersonalData/>
            <UserInfoPassword/>
        </Grid>
    );
};

export default UserInfo;
