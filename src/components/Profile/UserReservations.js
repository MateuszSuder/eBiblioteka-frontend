import React, {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    Grid,
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";
import FullWidthButton from "./../FullWidthButton";
import CustomModal from "./../CustomModal";
import ReservationStatusChip from "./../AdminPanel/ReservationStatusChip";
import CustomTooltip from "./../CustomTooltip";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import {useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";
import theme from "../theme/theme";
import useAuth from "../../context/AuthProvider";
import useSnackbar from "../../context/SnackbarProvider";

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

const UserReservationDeleteModal = ({ open, setOpen, reservation }) => {
    const queryClient = useQueryClient();
    const { addSnackbar } = useSnackbar();
    const deleteReservationMutation = useMutation(() => axios.delete(`/api/reservation/${reservation._id}`), {
        onSuccess: async () => {
            addSnackbar("Rezerwacja usuni??ta", "success");
            await queryClient.invalidateQueries({queryKey: [`user-${reservation.userId}-reservations`]});
        },
        onError: () => {
            addSnackbar("Nie uda??o si?? anulowa?? rezerwacji", "error")
        }
    })

    const deleteReservation = () => {
        deleteReservationMutation.mutate();
        setOpen(false);
    };

    return (
        <CustomModal setOpen={setOpen} open={open}>
            <UserReservationModal
                title="Czy na pewno chcesz anulowa?? rezerwacj???"
                rightText="Anuluj"
                leftText="Zamknij"
                leftAction={() => setOpen(false)}
                rightAction={deleteReservation}
            />
        </CustomModal>
    );
};

const UserReservationRow = ({ reservation }) => {
    const { isLoading, data, error} = useQuery(`book-${reservation.bookId}`, () => axios.get(`/api/book/${reservation.bookId}`), {
        refetchOnWindowFocus: false
    });
    const [modal, setModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const navigate = useNavigate();

    if(isLoading) {
        return (
            <></>
        )
    }

    if(error) {
        return (
            <></>
        )
    }

    const book = data.data;

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
                    <CustomTooltip content={new Date(reservation.validTill).toLocaleDateString()} />
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
                            <Tooltip title={`Anuluj rezerwacj??`}>
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
                    reservation={reservation}
                />
            </UserReservationContext.Provider>
        </>
    );
};

const UserReservations = () => {
    const { user } = useAuth();
    const { data, isLoading, error } = useQuery(`user-${user._id}-reservations`, () => axios.get(`/api/reservation/${user._id}`), {
        refetchOnWindowFocus: false
    });

    if(isLoading) return (
        <Skeleton variant={"rounded"} animation={"wave"} height={60}/>
    )

    if(error) {
        return (
            <Typography align="center" variant="h5" color={theme.palette.error.main}>
                Wyst??pi?? b????d
            </Typography>
        )
    }

    const userReservations = data.data.reservations;

    return (
        <TableContainer component={Paper}>
            <Table aria-label="Lista rezerwacji" sx={{ tableLayout: "fixed" }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Wydawnictwo</TableCell>
                        <TableCell>Tytu??</TableCell>
                        <TableCell>Data wyga??ni??cia</TableCell>
                        <TableCell align="center">Status rezerwacji</TableCell>
                        <TableCell align="center">Usu?? rezerwacj??</TableCell>
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
