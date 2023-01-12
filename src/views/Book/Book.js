import React from 'react';
import {Navigate, useParams} from "react-router-dom";
import {Button, Card, Divider, Grid, Skeleton, Stack, Typography} from "@mui/material";
import BookRow from "../../components/Book/BookRow";
import {useMutation, useQuery} from "react-query";
import axios from "axios";
import useAuth from "../../context/AuthProvider";
import useSnackbar from "../../context/SnackbarProvider";

const Book = () => {
    const { addSnackbar } = useSnackbar();
    const { user } = useAuth();
    const {bookId} = useParams();
    const { isLoading, error, data } = useQuery(`book-${bookId}`, () => axios.get(`/api/book/${bookId}`), { retry: false });
    const mutation = useMutation(() => axios.post(`/api/reservation/${user._id}/${bookId}`), {
        onSuccess: () => {
            addSnackbar("Zarezerwowano!", "success");
        }
    })

    if (isLoading) {
        return (
            <Stack>
                <Skeleton variant="text"/>
                <Skeleton variant="rectangular"/>
                <Skeleton variant="rectangular"/>
                <Skeleton variant="rectangular"/>
                <Skeleton variant="rectangular"/>
            </Stack>

        )
    }

    if(error) {
        return (
            <Navigate to="/"/>
        )
    }

    const book = data.data;

    return (
        <Grid container flexDirection="column" my={3}>
            <Grid item>
                <Typography align="center" variant="h5" my={2}>
                    {book.title}
                </Typography>
            </Grid>
            <Grid item mb={2}>
                <Divider/>
            </Grid>
            <Card elevation={4}>
                <Grid item container my={2} gap={1}>
                    <BookRow value={book.isbn} label="ISBN" />
                    <BookRow value={book.author} label="Autor" />
                    <BookRow value={book.publisher} label="Wydawnictwo" />
                    <BookRow value={book.category} label="Kategoria" divider={false} />
                </Grid>
            </Card>
            <Grid item mt={2} justifyContent="flex-end" display="flex">
                <Button variant="contained" disabled={mutation.isLoading || !user} onClick={mutation.mutate}>
                    Zarezerwuj
                </Button>
            </Grid>
        </Grid>
    );
};

export default Book;