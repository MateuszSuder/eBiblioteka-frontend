import React from 'react';
import {Grid} from "@mui/material";
import BookListOptions from "../../views/BookList/BookListOptions";
import BookListTable from "../../views/BookList/BookListTable";

const BookListWithSearch = ({inputWidth = 2, includeCategory = true, onSelect}) => {
    return (
        <Grid item xs={12}>
            <BookListOptions includeCategory={includeCategory} inputWidth={inputWidth}/>
            <BookListTable onSelect={onSelect} />
        </Grid>
    );
};

export default BookListWithSearch;