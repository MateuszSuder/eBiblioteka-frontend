import React, { useState } from "react";
import { Grid } from "@mui/material";
import UserInfoPasswordSummary from "./UserInfoPasswordSummary";
import UserInfoPasswordForm from "./UserInfoPasswordForm";
import UserInfoContainer from "../UserInfoContainer";

const UserInfoPassword = () => {
    const [changePassword, setChangePassword] = useState(false);

    return (
        <Grid container item xs={6} md={3} xl={2} direction="column">
            <UserInfoContainer title="Zmiana hasła">
                {!changePassword ? (
                    <UserInfoPasswordSummary
                        setChangePassword={setChangePassword}
                    />
                ) : (
                    <UserInfoPasswordForm
                        setChangePassword={setChangePassword}
                    />
                )}
            </UserInfoContainer>
        </Grid>
    );
};

export default UserInfoPassword;
