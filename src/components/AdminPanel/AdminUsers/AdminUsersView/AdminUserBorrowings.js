import React from 'react';
import AdminUserAccordion from "./AdminUserAccordion";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Chip,
    Grid,
    Link,
    Skeleton,
    Stack,
    Typography
} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import BORROWING_STATUS from "../../../../enums/BORROWING_STATUS";
import TypographyLink from "../../../TypographyLink";
import theme from "../../../theme/theme";
import FullWidthButton from "../../../FullWidthButton";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import {useQuery} from "react-query";
import axios from "axios";

export const BorrowingStatusChip = ({status}) => {
    switch (status) {
        case BORROWING_STATUS.BORROWED:
            return (
                <Chip label="wypożyczono" color="primary"/>
            )
        case BORROWING_STATUS.OVERDUE:
            return (
                <Chip label="zaległa" color="error"/>
            )
        case BORROWING_STATUS.RETURNED:
            return (
                <Chip label="zwrócono" color="success"/>
            )
        default:
            return (<></>)
    }
}

const AdminUserBorrowing = ({item: borrowing}) => {
    const { isLoading, data, error} = useQuery(`book-${borrowing.bookId}`, () => axios.get(`/api/book/${borrowing.bookId}`), {
        refetchOnWindowFocus: false
    });

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
    const title = book.title.length > 35 ? book.title.slice(0, 35) + "..." : book.title;

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Grid container justifyContent="space-between">
                    <Grid item xs={7}>
                        <Typography>{title}</Typography>
                    </Grid>
                    {
                        borrowing.renewalRequest && (
                            <Grid item xs={1}>
                                <PriorityHighIcon color="error" />
                            </Grid>
                        )
                    }
                    <Grid item xs={4} container alignItems="center" justifyContent="center">
                        <BorrowingStatusChip status={borrowing.status}/>
                    </Grid>
                </Grid>

            </AccordionSummary>
            <AccordionDetails>
                <Grid container flexDirection="column">
                    <Grid item>
                        <Link to={`/book/${borrowing.bookId}`}>
                            <TypographyLink variant="h6">
                                {book.title}
                            </TypographyLink>
                        </Link>
                    </Grid>
                    {
                        borrowing.expiryDate &&
                        <Grid item>
                            <Typography variant="caption" color={theme.palette.grey["400"]}>
                                Wypożyczono do: {borrowing.expiryDate}
                            </Typography>
                        </Grid>
                    }
                    <Grid item>
                        <Typography>
                            Przedłużano wcześniej: { borrowing.renewedBefore ? "Tak" : "Nie" }
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography color={borrowing.renewalRequest ? "error" : "inherit"}>
                            Prośba o przedłużenie: { borrowing.renewalRequest ? "Tak" : "Nie" }
                        </Typography>
                    </Grid>
                    {
                        borrowing.status !== BORROWING_STATUS.RETURNED && (
                            <Grid item container mt={3} justifyContent="space-between" px={2}>
                                <Grid item xs={5}>
                                    <FullWidthButton variant="contained" color="secondary">Zakończ</FullWidthButton>
                                </Grid>
                                <Grid item xs={5}>
                                    <FullWidthButton variant="contained" color="primary">Przedłuż</FullWidthButton>
                                </Grid>
                            </Grid>
                        )

                    }
                </Grid>
            </AccordionDetails>
        </Accordion>
    )
}

const AdminUserBorrowings = ({userId}) => {
    const { data, isLoading, error } = useQuery(`user-${userId}-borrowings`, () => axios.get(`/api/borrowing/${userId}`), {
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

    const borrowings = data.data.borrowings;

    return (
        <AdminUserAccordion
            list={borrowings}
            ListComponent={AdminUserBorrowing}
            title={"Wypożyczenia użytkownika"}
            listEmptyMessage={"Brak wypożyczeń"}
        />
    );
};

export default AdminUserBorrowings;