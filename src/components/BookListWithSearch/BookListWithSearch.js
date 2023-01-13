import React, {createContext, useState} from 'react';
import {Grid} from "@mui/material";
import BookListOptions from "./BookListOptions";
import BookListTable from "./BookListTable";

export const BookListContext = createContext({});

const BookListWithSearch = ({inputWidth = 2, includeCategory = true, onSelect, children}) => {
    const [books, setBooks] = useState([]);

    return (
        <Grid item xs={12}>
            <BookListContext.Provider value={{ books, setBooks }}>
                <BookListOptions includeCategory={includeCategory} inputWidth={inputWidth}/>
                <BookListTable onSelect={onSelect}>
                    {children}
                </BookListTable>
            </BookListContext.Provider>
        </Grid>
    );
};

export default BookListWithSearch;