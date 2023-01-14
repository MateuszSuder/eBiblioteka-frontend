import React, { createContext, useState, userBorrows } from "react";
import {
    TableHead,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FullWidthButton from "./../FullWidthButton";
import CustomModal from "./../CustomModal";
import useFindUser from "./../../hooks/useFindUser";
import useFindBook from "./../../hooks/useFindBook";
import CustomTooltip from "./../CustomTooltip";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import { BorrowingStatusChip } from "./../AdminPanel/AdminUsers/AdminUsersView/AdminUserBorrowings";
const UserBorrowContext = createContext({});

const UserBorrowingsModal = ({
    title,
    leftAction,
    leftText,
    rightAction,
    rightText,
}) => {
    return (
        <Grid container justifyContent="center" gap={3}>
            <Grid item xs={12}>
                <Typography align="center" variant="h6">
                    {title}
                </Typography>
            </Grid>

            <Grid item container xs={12} md={8} justifyContent="space-between">
                <Grid item xs={5}>
                    <FullWidthButton variant="outlined" onClick={leftAction}>
                        {leftText}
                    </FullWidthButton>
                </Grid>
                <Grid item xs={5}>
                    <FullWidthButton variant="contained" onClick={rightAction}>
                        {rightText}
                    </FullWidthButton>
                </Grid>
            </Grid>
        </Grid>
    );
};

const UserBorrowDeleteModal = ({ open, setOpen, BorrowId }) => {
    const deleteBorrow = () => {
        console.log("delete");
        setOpen(false);
    };

    return (
        <CustomModal setOpen={setOpen} open={open}>
            <UserBorrowingsModal
                title="Czy na pewno chcesz anulować rezerwację?"
                rightText="Anuluj"
                leftText="Zamknij"
                leftAction={() => setOpen(false)}
                rightAction={deleteBorrow}
            />
        </CustomModal>
    );
};

const UserBorrowRow = ({ Borrow }) => {
    const user = useFindUser(Borrow.userId);
    const book = useFindBook(Borrow.bookId);
    const [modal, setModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const navigate = useNavigate();
    if (!user || !book) return <></>;
    const selectBook = (bookId) => {
        navigate(`/book/${bookId}`);
    };
    return (
        <>
            <TableRow
                hover
                sx={{ cursor: "pointer" }}
                onClick={() => selectBook(Borrow.bookId)}
            >
                <TableCell width="20%">
                    <CustomTooltip content={book.category} />
                </TableCell>
                <TableCell width="20%">
                    <CustomTooltip content={book.title} />
                </TableCell>
                <TableCell width="10%">
                    <CustomTooltip content={Borrow.validTill} />
                </TableCell>
                <TableCell width="10%">
                    <Grid container justifyContent="center">
                        <BorrowingStatusChip status={Borrow.status} />
                    </Grid>
                </TableCell>

                <TableCell width="10%">
                    <Grid
                        container
                        justifyContent="center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {Borrow.status === "RESERVED" && (
                            <Tooltip title={`Anuluj rezerwację`}>
                                <DoDisturbOnOutlinedIcon
                                    onClick={() => setDeleteModal(true)}
                                />
                            </Tooltip>
                        )}
                    </Grid>
                </TableCell>
            </TableRow>
            <UserBorrowContext.Provider
                value={{
                    modal,
                    setModal,
                }}
            >
                <UserBorrowDeleteModal
                    open={deleteModal}
                    setOpen={setDeleteModal}
                    BorrowId={Borrow._id}
                />
            </UserBorrowContext.Provider>
        </>
    );
};

const UserBorrowings = () => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="Lista rezerwacji" sx={{ tableLayout: "fixed" }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Wydawnictwo</TableCell>
                        <TableCell>Tytuł</TableCell>
                        <TableCell>Data rezerwacji</TableCell>
                        <TableCell align="center">Status rezerwacji</TableCell>
                        <TableCell align="center">Usuń rezerwację</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userBorrows.map((Borrow, i) => (
                        <UserBorrowRow key={`Borrow-${i}`} Borrow={Borrow} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserBorrowings;
