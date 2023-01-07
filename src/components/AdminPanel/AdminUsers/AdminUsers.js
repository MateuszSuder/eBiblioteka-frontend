import React, {useState} from 'react';
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
import users from "../../../mock/users";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import BlockIcon from '@mui/icons-material/Block';
import AdminUserView from "./AdminUserView";
import RoleChip from "./RoleChip";

const AdminUsersIcon = ({Icon, tooltip}) => {
    return (
        <Grid item sx={{display: "flex", alignItems: "center"}}>
            <Tooltip title={tooltip}>
                <Icon />
            </Tooltip>
        </Grid>
    )
}



const AdminUsersTableRow = ({user}) => {
    const [userId, setUserId] = useState(null);
    const [open, setOpen] = useState(false);

    const openModal = () => {
        setUserId(user._id);
        setOpen(true);
    }

    return (
        <>
            <TableRow hover sx={{cursor: "pointer"}} onClick={openModal}>
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
            <AdminUserView open={open} setOpen={setOpen} id={userId} />
        </>
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