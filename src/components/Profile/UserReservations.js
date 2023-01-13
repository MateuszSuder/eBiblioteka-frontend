import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import FullWidthButton from "./../FullWidthButton";
import CustomModal from "./../CustomModal";
import ReservationStatusChip from "./../AdminPanel/ReservationStatusChip";
import useFindUser from "./../../hooks/useFindUser";
import useFindBook from "./../../hooks/useFindBook";
import CustomTooltip from "./../CustomTooltip";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import userReservations from "./../../mock/userReservations";
const UserReservationContext = createContext({});

const UserReservationModal = ({
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

const UserReservationDeleteModal = ({ open, setOpen, reservationId }) => {
    const deleteReservation = () => {
        console.log("delete");
        setOpen(false);
    };

    return (
        <CustomModal setOpen={setOpen} open={open}>
            <UserReservationModal
                title="Czy na pewno chcesz anulować rezerwację?"
                rightText="Anuluj"
                leftText="Zamknij"
                leftAction={() => setOpen(false)}
                rightAction={deleteReservation}
            />
        </CustomModal>
    );
};

const UserReservationRow = ({ reservation }) => {
    const user = useFindUser(reservation.userId);
    const book = useFindBook(reservation.bookId);
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
                onClick={() => selectBook(reservation.bookId)}
            >
                <TableCell width="20%">
                    <CustomTooltip content={book.category} />
                </TableCell>
                <TableCell width="20%">
                    <CustomTooltip content={book.title} />
                </TableCell>
                <TableCell width="10%">
                    <CustomTooltip content={reservation.validTill} />
                </TableCell>
                <TableCell width="10%">
                    <Grid container justifyContent="center">
                        <ReservationStatusChip status={reservation.status} />
                    </Grid>
                </TableCell>

                <TableCell width="10%">
                    <Grid
                        container
                        justifyContent="center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {reservation.status === "RESERVED" && (
                            <Tooltip title={`Anuluj rezerwację`}>
                                <DoDisturbOnOutlinedIcon
                                    onClick={() => setDeleteModal(true)}
                                />
                            </Tooltip>
                        )}
                    </Grid>
                </TableCell>
            </TableRow>
            <UserReservationContext.Provider
                value={{
                    modal,
                    setModal,
                }}
            >
                <UserReservationDeleteModal
                    open={deleteModal}
                    setOpen={setDeleteModal}
                    reservationId={reservation._id}
                />
            </UserReservationContext.Provider>
        </>
    );
};

const UserReservations = () => {
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
                    {userReservations.map((reservation, i) => (
                        <UserReservationRow
                            key={`reservation-${i}`}
                            reservation={reservation}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserReservations;
