import React, {useState} from 'react';
import {
    Grid,
    Paper,
    Skeleton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Tooltip,
    Typography
} from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import BlockIcon from '@mui/icons-material/Block';
import AdminUserView from "./AdminUsersView/AdminUserView";
import RoleChip from "./RoleChip";
import AdminUserAction from "./AdminUsersAction/AdminUserAction";
import {useQuery} from "react-query";
import axios from "axios";
import theme from "../../theme/theme";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

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
    const [userId, setUserId] = useState();
    const [openUser, setOpenUser] = useState(false);
    const [openAction, setOpenAction] = useState(false);
    const [action, setAction] = useState(null);

    const openUserModal = () => {
        console.log("open user modal", user._id);
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
                        <AdminUsersIcon Icon={user.isBanned ? CheckCircleOutlineOutlinedIcon : BlockIcon} tooltip={user.isBanned ? "Odblokuj użytkownika" : "Zablokuj użytkownika"} onClick={() => openActionModal("BLOCK")}/>
                        <AdminUsersIcon Icon={NoAccountsIcon} tooltip="Usuń użytkownika" onClick={() => openActionModal("DELETE")}/>
                    </Grid>
                </TableCell>
            </TableRow>
            <AdminUserView open={openUser} setOpen={setOpenUser} user={user}/>
            {
                action && (
                    <AdminUserAction user={user} action={action} open={openAction} setOpen={setActionModal}/>
                )
            }
        </>
    )
}

const AdminUsers = () => {
    const { data, isLoading, error } = useQuery("users", () => axios.get("/api/user/all"), {
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

    return (
        <Grid maxWidth="xl">
            <TableContainer component={Paper}>
                <Table aria-label="Użytkownicy">
                    <TableBody>
                        {data.data.users.map(user => (
                            <AdminUsersTableRow key={user._id} user={user}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
};

export default AdminUsers;