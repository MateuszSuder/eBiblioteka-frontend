import React, {useState} from 'react';
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import categories from "../../mock/categories";

const BookListOptions = ({inputWidth, includeCategory}) => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");

    const search = () => {
        console.log(category, name);
    }

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
                                {categories.map(s => (
                                    <MenuItem value={s} key={s}>{s}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                )
            }
            <Grid item container xs={2} alignItems="center">
                <Button variant="contained" size="large" onClick={search}>
                    Filtruj
                </Button>
            </Grid>
        </Grid>
    );
};

export default BookListOptions;