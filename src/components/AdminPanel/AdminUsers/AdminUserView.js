import React, {useEffect, useState} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Button, Chip,
    Grid, Link,
    Modal, styled, Table,
    TableBody, TableCell, TableRow,
    Typography
} from "@mui/material";
import users from "../../../mock/users";
import RoleChip from "./RoleChip";
import {ExpandMore} from "@mui/icons-material";
import userReservations from "../../../mock/userReservations";
import bookList from "../../../mock/bookList";
import theme from "../../theme/theme";
import ColorAvatar from "../../ColorAvatar";
import FullWidthButton from "../../FullWidthButton";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: 1,
    boxShadow: 24,
    p: 4,
    maxHeight: "80vh",
    overflowY: "auto"
};


const TypographyLink = styled(Typography)`
  ${({theme}) => `
    cursor: pointer;
    transition: all 0.15s;
    &:hover {
        color: ${theme.palette.primary.main}
    }
  `}
`

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

const UserReservation = ({reservation}) => {
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

const UserReservations = ({reservations}) => {
    return (
        <Accordion sx={{ width: "100%" }}>
            <AccordionSummary
                expandIcon={<ExpandMore/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Rezerwacje użytkownika</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {
                    reservations.length ?
                        (
                            <Table aria-label="Lista książek" sx={{tableLayout: "fixed"}}>
                                <TableBody>
                                    <TableRow>
                                        <TableCell width="50%">
                                            {reservations.map((reservation, i) => (
                                                <UserReservation key={`res-${i}`} reservation={reservation}/>
                                            ))}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        ) :
                        (
                            <Typography align="center" color={theme.palette.grey["400"]}>
                                Brak rezerwacji
                            </Typography>
                        )
                }

            </AccordionDetails>
        </Accordion>
    )
}

const AdminUserView = ({open, setOpen, id}) => {
    const [user, setUser] = useState(users.find(user => user._id === id));
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        // todo get user from api
        setUser(users.find(user => user._id === id));
    }, [id]);

    useEffect(() => {
        if (user) setReservations(userReservations.filter(r => r.userId === user._id));
    }, [user])

    if (!user) return (
        <></>
    )

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <Grid container sx={style}>
                <Grid container alignItems="center" flexDirection="column" gap={1}>
                    <Grid item>
                        <ColorAvatar text={`${user.name} ${user.lastName}`} />
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
                    <UserReservations reservations={reservations}/>
                    <Button variant="contained">
                        Dodaj wypożyczenie
                    </Button>
                </Grid>
            </Grid>
        </Modal>
    );
};

export default AdminUserView;