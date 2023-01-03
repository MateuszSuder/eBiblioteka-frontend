import {Chip} from "@mui/material";
import React from "react";

const RoleChip = ({role}) => {
    switch(role) {
        case "USER":
            return (
                <Chip label="użytkownik" color="success" />
            )
        case "LIBRARIAN":
            return (
                <Chip label="bibliotekarz" color="primary" />
            )
        case "ADMIN":
            return (
                <Chip label="administrator" color="secondary" />
            )
        default:
            return (<></>)
    }
}

export default RoleChip;