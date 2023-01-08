import React, {useEffect, useState} from 'react';
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip, Typography} from "@mui/material";
import users from "../../../mock/users";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import BlockIcon from '@mui/icons-material/Block';
import AdminUserView from "./AdminUsersView/AdminUserView";
import RoleChip from "./RoleChip";
import AdminUserAction from "./AdminUsersAction/AdminUserAction";

const AdminUsersIcon = ({Icon, tooltip, onClick}) => {
    return (
        <Grid item sx={{display: "flex", alignItems: "center"}} onClick={e => e.stopPropagation()}>
            <Tooltip title={tooltip}>
                <Icon onClick={onClick}/>
            </Tooltip>
        </Grid>
    )
}

const AdminUsersTableRow = ({user}) => {
    const [userId, setUserId] = useState(null);
    const [openUser, setOpenUser] = useState(false);
    const [openAction, setOpenAction] = useState(false);
    const [action, setAction] = useState(null);

    const openUserModal = () => {
        setUserId(user._id);
        setOpenUser(true);
    }

    /**
     * @param {"MODIFY" | "BLOCK" | "DELETE"} action
     */
    const openActionModal = (action) => {
        setUserId(user._id);
        setAction(action);
        setOpenAction(true);
    }

    const setActionModal = (val) => {
        if(!val) {
            setAction(null);
        }

        setOpenAction(val);
    }

    return (
        <>
            <TableRow hover sx={{cursor: "pointer"}} onClick={openUserModal}>
                <TableCell width="30%">
                    <Typography>
                        {user.email}
                    </Typography>
                </TableCell>
                <TableCell width="35%">
                    <Typography>
                        {user.name} {user.lastName}
                    </Typography>
                </TableCell>
                <TableCell width="15%">
                    <RoleChip role={user.role}/>
                </TableCell>
                <TableCell width="10%">
                    <Grid container alignItems="center">
                        <AdminUsersIcon Icon={ManageAccountsIcon} tooltip="Zmień rolę użytkownika" onClick={() => openActionModal("MODIFY")} />
                        <AdminUsersIcon Icon={BlockIcon} tooltip="Zablokuj użytkownika"/>
                        <AdminUsersIcon Icon={NoAccountsIcon} tooltip="Usuń użytkownika"/>
                    </Grid>
                </TableCell>
            </TableRow>
            <AdminUserView open={openUser} setOpen={setOpenUser} id={userId}/>
            {
                action && (
                    <AdminUserAction userId={userId} action={action} open={openAction} setOpen={setActionModal}/>
                )
            }
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
                            <AdminUsersTableRow key={user._id} user={user}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
};

export default AdminUsers;