import React, {useState} from 'react';
import {
    Grid,
    Paper,
    Skeleton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow, Tooltip,
    Typography
} from "@mui/material";
import bookList from "../../mock/bookList";
import {useNavigate} from "react-router-dom";

const BookTooltip = ({content}) => {
    return (
        <Tooltip title={content} followCursor>
            <Typography noWrap>
                {content}
            </Typography>
        </Tooltip>
    )
}

const BookTableRow = ({book, selectBook}) => {
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
        </TableRow>
    )
}

const BookListTable = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const selectBook = (bookId) => {
        navigate(`book/${bookId}`);
    }

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
                            <BookTableRow key={book._id} book={book} selectBook={selectBook} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default BookListTable;