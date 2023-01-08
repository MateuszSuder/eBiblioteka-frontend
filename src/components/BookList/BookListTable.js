import React, {createContext, useState} from 'react';
import {
    Paper,
    Skeleton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Tooltip,
    Typography
} from "@mui/material";
import bookList from "../../mock/bookList";

const BookTooltip = ({content}) => {
    return (
        <Tooltip title={content} followCursor>
            <Typography noWrap>
                {content}
            </Typography>
        </Tooltip>
    )
}

export const BookContext = createContext({});

const BookTableRow = ({book, selectBook, children}) => {
    return (
        <TableRow hover onClick={() => selectBook(book._id)} sx={{cursor: "pointer"}}>
            <TableCell width="50%">
                <BookTooltip content={book.title} />
            </TableCell>
            <TableCell width="25%">
                <BookTooltip content={book.category} />
            </TableCell>
            <TableCell width="25%">
                <BookTooltip content={book.author} />
            </TableCell>
            <BookContext.Provider value={book}>
                {children}
            </BookContext.Provider>
        </TableRow>
    )
}

const BookListTable = ({onSelect, children}) => {
    const [loading, setLoading] = useState(false);

    if(loading)
        return (
            <Stack spacing={0.5}>
                <Skeleton variant={"rounded"} animation={"wave"} height={60} />
                <Skeleton variant={"rounded"} animation={"wave"} height={60} />
                <Skeleton variant={"rounded"} animation={"wave"} height={60} />
            </Stack>
        )

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="Lista książek" sx={{ tableLayout: "fixed" }}>
                    <TableBody>
                        {bookList.books.map(book => (
                            <BookTableRow key={book._id} book={book} selectBook={onSelect}>
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