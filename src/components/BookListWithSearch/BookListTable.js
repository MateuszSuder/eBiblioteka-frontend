import React, {createContext, useContext, useEffect} from 'react';
import {Paper, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import CustomTooltip from "../CustomTooltip";
import {useQuery} from "react-query";
import axios from "axios";
import {BookListContext} from "./BookListWithSearch";


export const BookContext = createContext({});

const BookTableRow = ({book, selectBook, children}) => {
    return (
        <TableRow hover onClick={() => selectBook(book._id)} sx={{cursor: "pointer"}}>
            <TableCell width="50%">
                <CustomTooltip content={book.title} />
            </TableCell>
            <TableCell width="25%">
                <CustomTooltip content={book.category} />
            </TableCell>
            <TableCell width="25%">
                <CustomTooltip content={book.author} />
            </TableCell>
            <BookContext.Provider value={book}>
                {children}
            </BookContext.Provider>
        </TableRow>
    )
}

const BookListTable = ({onSelect, children}) => {
    const { isLoading, data, error } = useQuery("books", () => axios.get("http://localhost/api/book"), {
        enabled: true,
        refetchOnWindowFocus: false
    })
    const { books, setBooks } = useContext(BookListContext);


    useEffect(() => {
        if(data && data.data) {
            setBooks(data.data.books);
        }
    }, [isLoading])

    if(isLoading || !books) {
        return (
            <Stack spacing={0.5}>
                <Skeleton variant={"rounded"} animation={"wave"} height={60}/>
                <Skeleton variant={"rounded"} animation={"wave"} height={60}/>
                <Skeleton variant={"rounded"} animation={"wave"} height={60}/>
            </Stack>
        )
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="Lista książek" sx={{ tableLayout: "fixed" }}>
                    <TableBody>
                        {books.map(book => (
                            <BookTableRow key={book._id} book={book} selectBook={() => onSelect(book._id)}>
                                {children}
                            </BookTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default BookListTable;