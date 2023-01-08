import React, {createContext, useContext, useState} from 'react';
import {
    Card,
    Divider,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Tooltip,
    Typography
} from "@mui/material";
import userReservations from "../../../mock/userReservations";
import CustomTooltip from "../../CustomTooltip";
import useFindUser from "../../../hooks/useFindUser";
import useFindBook from "../../../hooks/useFindBook";
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import CustomModal from "../../CustomModal";
import ReservationStatusChip from "../ReservationStatusChip";
import BookRow from "../../Book/BookRow";
import ColorAvatar from "../../ColorAvatar";
import RoleChip from "../AdminUsers/RoleChip";
import theme from "../../theme/theme";
import FullWidthButton from "../../FullWidthButton";

const AdminReservationContext = createContext({});

const AdminReservationModal = ({title, leftAction, leftText, rightAction, rightText}) => {
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
                        { leftText }
                    </FullWidthButton>
                </Grid>
                <Grid item xs={5}>
                    <FullWidthButton variant="contained" onClick={rightAction}>
                        { rightText }
                    </FullWidthButton>
                </Grid>
            </Grid>
        </Grid>
    )
}

const AdminReservationBorrowModal = ({open, setOpen, reservationId}) => {

    const borrow = () => {
        console.log("borrow");
        setOpen(false);
    }

    return (
        <CustomModal setOpen={setOpen} open={open}>
            <AdminReservationModal
                title="Wypożycz"
                leftText="Anuluj"
                rightText="Wypożycz"
                leftAction={() => setOpen(false)}
                rightAction={borrow}
            />
        </CustomModal>
    )

}

const AdminReservationDeleteModal = ({open, setOpen, reservationId}) => {

    const deleteReservation = () => {
        console.log("delete");
        setOpen(false);
    }

    return (
        <CustomModal setOpen={setOpen} open={open}>
            <AdminReservationModal
                title="Usuń rezerwację"
                leftText="Anuluj"
                rightText="Usuń"
                leftAction={() => setOpen(false)}
                rightAction={deleteReservation}
            />
        </CustomModal>
    )
}

const AdminReservationInfo = ({reservation, user, book}) => {
    const { modal, setModal } = useContext(AdminReservationContext);

    return (
        <CustomModal setOpen={setModal} open={modal} customStyle={{ width: "60vw" }}>
            <Grid container alignItems="center" flexDirection="column" gap={1} sx={{borderBottom: `1px solid rgba(0, 0, 0, 0.12)`, paddingBottom: "0.5rem"}}>
                <Grid item>
                    <ColorAvatar text={`${user.name} ${user.lastName}`}/>
                </Grid>
                <Grid item mb={1}>
                    <RoleChip role={user.role}/>
                </Grid>
                <Typography variant="h5">
                    {user.name} {user.lastName}
                </Typography>
                <Typography>
                    {user.email}
                </Typography>
            </Grid>
            <Grid container flexDirection="column" my={3}>
                <Grid item>
                    <Typography align="center" variant="h5" my={2}>
                        {book.title}
                    </Typography>
                </Grid>
                <Grid item container justifyContent="center" mb={2}>
                    <ReservationStatusChip status={reservation.status} />
                </Grid>
                <Grid item container justifyContent="center" color={theme.palette.grey[400]}>
                    <Typography>
                        {reservation.validTill}
                    </Typography>
                </Grid>
                <Grid item mb={2}>
                    <Divider/>
                </Grid>
                <Card elevation={4}>
                    <Grid item container my={2} gap={1}>
                        <BookRow value={book.isbn} label="ISBN" />
                        <BookRow value={book.author} label="Autor" />
                        <BookRow value={book.publisher} label="Wydawnictwo" />
                        <BookRow value={book.category} label="Kategoria" divider={false} />
                    </Grid>
                </Card>
            </Grid>
        </CustomModal>
    )
}

const AdminReservationRow = ({reservation}) => {
    const user = useFindUser(reservation.userId);
    const book = useFindBook(reservation.bookId);
    const [modal, setModal] = useState(false);
    const [borrowModal, setBorrowModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    if(!user || !book) return (
        <></>
    )

    return (
        <>
            <TableRow hover sx={{cursor: "pointer"}} onClick={() => setModal(true)}>
                <TableCell width="20%">
                    <CustomTooltip content={user.email} />
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
                    <Grid container justifyContent="center" onClick={e => e.stopPropagation()}>
                        <Tooltip title={`Usuń rezerwację`}>
                            <DeleteIcon onClick={() => setDeleteModal(true)} />
                        </Tooltip>
                        <Tooltip title={`Wypożycz użytkownikowi`}>
                            <BookmarkAddedIcon onClick={() => setBorrowModal(true)} />
                        </Tooltip>
                    </Grid>
                </TableCell>
            </TableRow>
            <AdminReservationContext.Provider value={{
                modal,
                setModal
            }}>
                <AdminReservationInfo user={user} book={book} reservation={reservation} />
                <AdminReservationBorrowModal
                    open={borrowModal}
                    setOpen={setBorrowModal}
                    reservationId={reservation._id}
                />
                <AdminReservationDeleteModal
                    open={deleteModal}
                    setOpen={setDeleteModal}
                    reservationId={reservation._id}
                />
            </AdminReservationContext.Provider>
        </>
    )
}

const AdminReservations = () => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="Lista rezerwacji" sx={{ tableLayout: "fixed" }}>
                <TableBody>
                    {
                        userReservations.map((reservation, i) => (
                            <AdminReservationRow key={`reservation-${i}`} reservation={reservation} />
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AdminReservations;