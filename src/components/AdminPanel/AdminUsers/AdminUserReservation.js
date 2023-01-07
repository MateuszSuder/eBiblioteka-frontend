import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Chip,
    Grid,
    Link,
    styled,
    Table, TableBody, TableCell, TableRow,
    Typography
} from "@mui/material";
import bookList from "../../../mock/bookList";
import {ExpandMore} from "@mui/icons-material";
import theme from "../../theme/theme";
import FullWidthButton from "../../FullWidthButton";
import React, {useEffect, useState} from "react";
import TypographyLink from "../../TypographyLink";
import AdminUserAccordion from "./AdminUserAccordion";
import userReservations from "../../../mock/userReservations";

const ReservationStatusChip = ({status}) => {
    switch (status) {
        case "RESERVED":
            return (
                <Chip label="zarezerwowano" color="primary"/>
            )
        case "CANCELLED":
            return (
                <Chip label="anulowano" color="warning"/>
            )
        case "BORROWED":
            return (
                <Chip label="wypożyczono" color="success"/>
            )
        case "EXPIRED":
            return (
                <Chip label="wygasło" color="error"/>
            )
        default:
            return (<></>)
    }
}

const AdminUserReservation = ({item: reservation}) => {
    const book = bookList.books.find(book => book._id === reservation.bookId);
    const title = book.title.length > 35 ? book.title.slice(0, 35) + "..." : book.title

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
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
                                {title}
                            </TypographyLink>
                        </Link>
                    </Grid>
                    {
                        reservation.validTill &&
                        <Grid item>
                            <Typography variant="caption" color={theme.palette.grey["400"]}>
                                Zarezerwowano do: {reservation.validTill}
                            </Typography>
                        </Grid>
                    }
                    {
                        reservation.status === "RESERVED" && (
                            <Grid item container mt={3} justifyContent="space-between" px={2}>
                                <Grid item xs={5}>
                                    <FullWidthButton variant="contained" color="error">Usuń rezerwację</FullWidthButton>
                                </Grid>
                                <Grid item xs={5}>
                                    <FullWidthButton variant="contained">Wypożycz</FullWidthButton>
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
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        if (userId) setReservations(userReservations.filter(r => r.userId === userId));
    }, [userId])

    if(!reservations) return (
        <></>
    )

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