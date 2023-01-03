import React from 'react';
import {Divider, Grid, Typography} from "@mui/material";
import BookListTable from "./BookListTable";
import BookListOptions from "./BookListOptions";

const BookList = () => {
    return (
        <>
            <Grid container>
                <Grid item xs={12} mb={2}>
                    <Typography letterSpacing={2} fontSize={22}>
                        Lista książek
                    </Typography>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <BookListOptions />
                    <BookListTable />
                </Grid>
            </Grid>
        </>
    );
};

export default BookList;