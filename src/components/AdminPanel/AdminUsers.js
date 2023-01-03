import React from 'react';
import {
    Chip,
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
import users from "../../mock/users";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import BlockIcon from '@mui/icons-material/Block';

const AdminUsersIcon = ({Icon, tooltip}) => {
    return (
        <Grid item sx={{display: "flex", alignItems: "center"}}>
            <Tooltip title={tooltip}>
                <Icon />
            </Tooltip>
        </Grid>
    )
}

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

const AdminUsersTableRow = ({user}) => {
    return (
        <TableRow hover sx={{cursor: "pointer"}}>
            <TableCell width="30%">
                <Typography>
                    { user.email }
                </Typography>
            </TableCell>
            <TableCell width="35%">
                <Typography>
                    { user.name } { user.lastName }
                </Typography>
            </TableCell>
            <TableCell width="15%">
                <RoleChip role={user.role} />
            </TableCell>
            <TableCell width="10%">
                <Grid container alignItems="center">
                    <AdminUsersIcon Icon={ManageAccountsIcon} tooltip="Zmień rolę użytkownika" />
                    <AdminUsersIcon Icon={BlockIcon} tooltip="Zablokuj użytkownika" />
                    <AdminUsersIcon Icon={NoAccountsIcon} tooltip="Usuń użytkownika" />
                </Grid>
            </TableCell>
        </TableRow>
    )
}

const AdminUsers = () => {
    return (
        <Grid maxWidth="xl">
            <TableContainer component={Paper}>
                <Table aria-label="Użytkownicy">
                    <TableBody>
                        {users.map(user => (
                            <AdminUsersTableRow key={user._id} user={user} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
};

export default AdminUsers;