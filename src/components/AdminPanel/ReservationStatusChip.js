import {Chip} from "@mui/material";
import React from "react";

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

export default ReservationStatusChip;