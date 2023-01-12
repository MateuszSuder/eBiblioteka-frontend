import React from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import theme from "../../../theme/theme";
import EditIcon from "@mui/icons-material/Edit";

const UserInfoPasswordSummary = ({ setChangePassword }) => {
    return (
        <>
            <Grid
                item
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Typography
                    variant="caption"
                    color={theme.palette.grey["400"]}
                    pl={2}
                >
                    ******
                </Typography>
            </Grid>
            <Grid item>
                <IconButton onClick={() => setChangePassword((prev) => !prev)}>
                    <EditIcon />
                </IconButton>
            </Grid>
        </>
    );
};

export default UserInfoPasswordSummary;
