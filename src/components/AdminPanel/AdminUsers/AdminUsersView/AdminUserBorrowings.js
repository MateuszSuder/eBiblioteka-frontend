import React, {useEffect, useState} from 'react';
import AdminUserAccordion from "./AdminUserAccordion";
import userBorrowings from "../../../../mock/userBorrowings";
import {Accordion, AccordionDetails, AccordionSummary, Chip, Grid, Link, Typography} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import bookList from "../../../../mock/bookList";
import BORROWING_STATUS from "../../../../enums/BORROWING_STATUS";
import TypographyLink from "../../../TypographyLink";
import theme from "../../../theme/theme";
import FullWidthButton from "../../../FullWidthButton";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const BorrowingStatusChip = ({status}) => {
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
    if(!borrowing) return (
        <></>
    )
    const book = bookList.books.find(book => book._id === borrowing.bookId);
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
                                {title}
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
    const [borrowings, setBorrowings] = useState([]);

    useEffect(() => {
        if (userId) setBorrowings(userBorrowings.filter(r => r.userId === userId));
    }, [userId])

    if(!borrowings.length) return (
        <></>
    )

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