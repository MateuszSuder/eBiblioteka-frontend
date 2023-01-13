import {Accordion, AccordionDetails, AccordionSummary, Grid, Link, Skeleton, Stack, Typography} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import theme from "../../../theme/theme";
import FullWidthButton from "../../../FullWidthButton";
import {useState} from "react";
import TypographyLink from "../../../TypographyLink";
import AdminUserAccordion from "./AdminUserAccordion";
import ReservationStatusChip from "../../ReservationStatusChip";
import {useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";
import useSnackbar from "../../../../context/SnackbarProvider";

const AdminUserReservation = ({item: reservation}) => {
    const [expanded, setExpanded] = useState(false);
    const queryClient = useQueryClient();
    const { addSnackbar } = useSnackbar();
    const { isLoading, data, error} = useQuery(`book-${reservation.bookId}`, () => axios.get(`/api/book/${reservation.bookId}`), {
        refetchOnWindowFocus: false
    });
    const deleteReservationMutation = useMutation(() => axios.delete(`/api/reservation/${reservation._id}`), {
        onSuccess: async () => {
            setExpanded(false);
            addSnackbar("Rezerwacja usunięta", "success");
            await queryClient.invalidateQueries({queryKey: [`user-${reservation.userId}-reservations`]});
        },
        onError: () => {
            addSnackbar("Nie udało się usunąć rezerwacji", "error")
        }
    })

    const borrowReservationMutation = useMutation(() => axios.post(`/api/borrowing/${reservation.userId}/${reservation.bookId}?reservationId=${reservation._id}`), {
        onSuccess: async () => {
            setExpanded(false);
            addSnackbar("Książka wypożyczona", "success");
            await queryClient.invalidateQueries({queryKey: [`user-${reservation.userId}-reservations`]});
        },
        onError: () => {
            addSnackbar("Nie udało się utworzyć wypożyczenia", "error")
        }
    })

    if(isLoading) {
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

    if(error) {
        return (
            <Grid maxWidth="xl">
                <Typography align="center" variant="h5" color={theme.palette.error.main}>
                    Wystąpił błąd
                </Typography>
            </Grid>
        )
    }

    const book = data.data;
    const title = book.title.length > 35 ? book.title.slice(0, 35) + "..." : book.title

    return (
        <Accordion expanded={expanded}>
            <AccordionSummary
                expandIcon={<ExpandMore/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
                onClick={() => setExpanded(!expanded)}
            >
                <Grid container>
                    <Grid item xs={8}>
                        <Typography>{title}</Typography>
                    </Grid>
                    <Grid item xs={4} container alignItems="center" justifyContent="center">
                        <ReservationStatusChip status={reservation.status}/>
                    </Grid>
                </Grid>

            </AccordionSummary>
            <AccordionDetails>
                <Grid container flexDirection="column">
                    <Grid item>
                        <Link to={`/book/${reservation.bookId}`}>
                            <TypographyLink variant="h6">
                                {book.title}
                            </TypographyLink>
                        </Link>
                    </Grid>
                    {
                        reservation.validTill &&
                        <Grid item>
                            <Typography variant="caption" color={theme.palette.grey["400"]}>
                                Zarezerwowano do: {new Date(reservation.validTill).toLocaleDateString()}
                            </Typography>
                        </Grid>
                    }
                    {
                        reservation.status === "RESERVED" && (
                            <Grid item container mt={3} justifyContent="space-between" px={2}>
                                <Grid item xs={5}>
                                    <FullWidthButton variant="contained" color="error" onClick={() => deleteReservationMutation.mutate()}>Usuń rezerwację</FullWidthButton>
                                </Grid>
                                <Grid item xs={5}>
                                    <FullWidthButton variant="contained" onClick={() => borrowReservationMutation.mutate()}>Wypożycz</FullWidthButton>
                                </Grid>
                            </Grid>
                        )
                    }
                </Grid>
            </AccordionDetails>
        </Accordion>
    )
}

const AdminUserReservations = ({userId}) => {
    const { data, isLoading, error } = useQuery(`user-${userId}-reservations`, () => axios.get(`/api/reservation/${userId}`), {
        refetchOnWindowFocus: false
    });


    if(isLoading) return (
        <Skeleton variant={"rounded"} animation={"wave"} height={60}/>
    )

    if(error) {
        return (
            <Typography align="center" variant="h5" color={theme.palette.error.main}>
                Wystąpił błąd
            </Typography>
        )
    }

    const reservations = data.data.reservations;

    return (
        <AdminUserAccordion
            list={reservations}
            ListComponent={AdminUserReservation}
            title={"Rezerwacje użytkownika"}
            listEmptyMessage={"Brak rezerwacji"}
        />
    )
}

export default AdminUserReservations;