import React, {useContext, useEffect, useState} from 'react';
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {BookListContext} from "./BookListWithSearch";
import {useQuery} from "react-query";
import axios from "axios";

const BookListOptions = ({inputWidth, includeCategory}) => {
    const books = useQuery("booksSearch", () => axios.get(`http://localhost/api/book?search=${name}&category=${category}`), {
        enabled: false,
        refetchOnWindowFocus: false
    })
    const categories = useQuery("categories", () => axios.get(`http://localhost/api/book/categories`), {
        refetchOnWindowFocus: false
    })

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [categoriesList, setCategoriesList] = useState([]);
    const { setBooks } = useContext(BookListContext);

    useEffect(() => {
        if(books.data) {
            setBooks(books.data.data.books);
        }
    }, [books.data])

    useEffect(() => {
        if(categories.data) {
            setCategoriesList([...categories.data.data.categories])
        }
    }, [categories.data])

    return (
        <Grid container mb={2} gap={1}>
            <Grid item xs={inputWidth}>
                <FormControl fullWidth>
                    <TextField label="Nazwa książki" value={name}
                               onChange={e => setName(e.target.value)}/>
                </FormControl>
            </Grid>
            {
                includeCategory && (
                    <Grid item xs={inputWidth}>
                        <FormControl fullWidth>
                            <InputLabel id="category-label">Kategoria</InputLabel>
                            <Select
                                labelId="category-label"
                                label="Kategoria"
                                id="category"
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                            >
                                {categoriesList.map(s => (
                                    <MenuItem value={s} key={s}>{s}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                )
            }
            <Grid item container xs={2} alignItems="center">
                <Button variant="contained" size="large" onClick={books.refetch}>
                    Filtruj
                </Button>
            </Grid>
        </Grid>
    );
};

export default BookListOptions;