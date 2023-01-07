import React from 'react';
import {Divider, Grid, Typography} from "@mui/material";
import BookListWithSearch from "../../components/BookListWithSearch/BookListWithSearch";
import {useNavigate} from "react-router-dom";

const BookList = () => {
    const navigate = useNavigate();

    const selectBook = (bookId) => {
        navigate(`book/${bookId}`);
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12} mb={2}>
                    <Typography letterSpacing={2} fontSize={22}>
                        Lista książek
                    </Typography>
                    <Divider />
                </Grid>
                <BookListWithSearch onSelect={selectBook} />
            </Grid>
        </>
    );
};

export default BookList;