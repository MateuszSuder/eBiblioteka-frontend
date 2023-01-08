import React from 'react';
import {Grid} from "@mui/material";
import BookListOptions from "../BookList/BookListOptions";
import BookListTable from "../BookList/BookListTable";

const BookListWithSearch = ({inputWidth = 2, includeCategory = true, onSelect, children}) => {
    return (
        <Grid item xs={12}>
            <BookListOptions includeCategory={includeCategory} inputWidth={inputWidth}/>
            <BookListTable onSelect={onSelect}>
                {children}
            </BookListTable>
        </Grid>
    );
};

export default BookListWithSearch;