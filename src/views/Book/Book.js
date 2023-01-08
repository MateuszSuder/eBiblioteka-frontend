import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Button, Card, Divider, Grid, Skeleton, Stack, Typography} from "@mui/material";
import bookList from "../../mock/bookList";
import BookRow from "../../components/Book/BookRow";

const Book = () => {
    const [book, setBook] = useState(bookList.books[0]);
    const [errors, setErrors] = useState({ from: false, to: false });
    const {bookId} = useParams();

    useEffect(() => {
        setBook(bookList.books.find(book => book._id === parseInt(bookId)));
    }, [book, bookId])

    if (!book) return (
        <Stack>
            <Skeleton variant="text"/>
        </Stack>
    )

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
                <Button variant="contained">
                    Zarezerwuj
                </Button>
            </Grid>
        </Grid>
    );
};

export default Book;