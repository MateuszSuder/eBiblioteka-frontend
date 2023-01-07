import React, {useState} from 'react';
import {Grid, Typography} from "@mui/material";
import theme from "../../../theme/theme";
import UserInfoPersonalDataSummary from "./UserInfoPersonalDataSummary";
import UserInfoPersonalDataForm from "./UserInfoPersonalDataForm";
import UserInfoContainer from "../UserInfoContainer";

const UserInfoPersonalData = () => {
    const [showForm, setShowForm] = useState(false);

    return (
        <Grid container item xs={5} direction="column">
            <UserInfoContainer title={"Dane osobowe"}>
                <Grid
                    item
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography
                        variant="caption"
                        color={theme.palette.grey["400"]}
                    >
                        Dane osobowe
                    </Typography>
                </Grid>
                {!showForm ? (
                    <UserInfoPersonalDataSummary setShowForm={setShowForm} />
                ) : (
                    <UserInfoPersonalDataForm setShowForm={setShowForm} />
                )}
            </UserInfoContainer>
        </Grid>
    );
};

export default UserInfoPersonalData;