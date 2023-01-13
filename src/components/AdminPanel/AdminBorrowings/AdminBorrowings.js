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
    TableRow,
    Tooltip,
    Typography
} from "@mui/material";
import {useQuery} from "react-query";
import axios from "axios";
import theme from "../../theme/theme";
import CustomTooltip from "../../CustomTooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import {BorrowingStatusChip} from "../AdminUsers/AdminUsersView/AdminUserBorrowings";

const AdminBorrowingRow = ({borrowing: {userId, bookId, expiryDate, status}}) => {
    const userQuery = useQuery(`user-${userId}`, () => axios.get(`/api/user?id=${userId}`));
    const bookQuery = useQuery(`book-${bookId}`, () => axios.get(`/api/book/${bookId}`));
    const [modal, setModal] = useState(false);
    const [borrowModal, setBorrowModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    if (userQuery.isLoading || bookQuery.isLoading) {
        return (
            <></>
        )
    }

    if (userQuery.error || bookQuery.error) {
        return (
            <></>
        )
    }

    const user = userQuery.data.data;
    const book = bookQuery.data.data;

    return (
        <>
            <TableRow hover sx={{cursor: "pointer"}} onClick={() => setModal(true)}>
                <TableCell width="20%">
                    <CustomTooltip content={user.email}/>
                </TableCell>
                <TableCell width="20%">
                    <CustomTooltip content={book.title}/>
                </TableCell>
                <TableCell width="10%">
                    <CustomTooltip content={expiryDate}/>
                </TableCell>
                <TableCell width="10%">
                    <Grid container justifyContent="center">
                        <BorrowingStatusChip status={status}/>
                    </Grid>
                </TableCell>
                <TableCell width="10%">
                    <Grid container justifyContent="center" onClick={e => e.stopPropagation()}>
                        <Tooltip title={`Usuń rezerwację`}>
                            <DeleteIcon onClick={() => setDeleteModal(true)}/>
                        </Tooltip>
                        <Tooltip title={`Wypożycz użytkownikowi`}>
                            <BookmarkAddedIcon onClick={() => setBorrowModal(true)}/>
                        </Tooltip>
                    </Grid>
                </TableCell>
            </TableRow>
        </>
    )
}

const AdminBorrowings = () => {
    const {data, isLoading, error} = useQuery("borrowings", () => axios.get("/api/borrowing"), {
        refetchOnWindowFocus: false
    });

    if (isLoading) {
        return (
            <Grid maxWidth="xl">
                <Stack spacing={0.5}>
                    <Skeleton variant={"rounded"} animation={"wave"} height={60}/>
                    <Skeleton variant={"rounded"} animation={"wave"} height={60}/>
                    <Skeleton variant={"rounded"} animation={"wave"} height={60}/>
                </Stack>
            </Grid>
        )
    }

    if (error) {
        return (
            <Grid maxWidth="xl">
                <Typography align="center" variant="h5" color={theme.palette.error.main}>
                    Wystąpił błąd
                </Typography>
            </Grid>
        )
    }

    const userBorrowings = data.data.borrowings;

    return (
        <TableContainer component={Paper}>
            <Table aria-label="Lista wypożyczeń" sx={{tableLayout: "fixed"}}>
                <TableBody>
                    <>
                        {
                            userBorrowings.map((borrowing, i) => (
                                <AdminBorrowingRow borrowing={borrowing} key={`borrowing-${i}`}/>
                            ))
                        }
                    </>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AdminBorrowings;