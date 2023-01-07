import React from "react";
import {Grid} from "@mui/material";
import UserInfoPassword from "./UserInfoPassword/UserInfoPassword";
import UserInfoPersonalData from "./UserInfoPersonalData/UserInfoPersonalData";

const UserInfo = () => {
    return (
        <Grid container spacing={3} pt={3}>
            <UserInfoPersonalData/>
            <UserInfoPassword/>
        </Grid>
    );
};

export default UserInfo;
