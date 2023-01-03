import React from 'react';
import {Divider, Grid, Typography} from "@mui/material";
import RoomListTable from "./RoomListTable";
import RoomListOptions from "./RoomListOptions";

const RoomList = () => {
    return (
        <>
            <Grid container>
                <Grid item xs={12} mb={2}>
                    <Typography letterSpacing={2} fontSize={22}>
                        Dostępne pokoje
                    </Typography>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <RoomListOptions />
                    <RoomListTable />
                </Grid>
            </Grid>
        </>
    );
};

export default RoomList;