import React, {createContext, useEffect, useState} from 'react';
import {Button, Grid, Typography} from "@mui/material";
import users from "../../../mock/users";
import RoleChip from "./RoleChip";
import ColorAvatar from "../../ColorAvatar";
import AdminUserReservations from "./AdminUserReservation";
import AdminUserBorrowings from "./AdminUserBorrowings";
import AdminUserAddBorrowing from "./AdminUserAddBorrowing";
import CustomModal from "../../CustomModal";

const AdminUserView = ({open, setOpen, id}) => {
    const [user, setUser] = useState(users.find(user => user._id === id));
    const [openAddBorrowing, setOpenAddBorrowing] = useState(false);

    useEffect(() => {
        // todo get user from api
        setUser(users.find(user => user._id === id));
    }, [id]);

    if (!user) return (
        <></>
    )

    return (
        <CustomModal open={open} setOpen={setOpen}>
            <Grid container alignItems="center" flexDirection="column" gap={1}>
                <Grid item>
                    <ColorAvatar text={`${user.name} ${user.lastName}`}/>
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
                <AdminUserReservations userId={user._id}/>
                <AdminUserBorrowings userId={user._id}/>
                <Button variant="contained" onClick={() => setOpenAddBorrowing(true)}>
                    Dodaj wypożyczenie
                </Button>
                <AdminUserAddBorrowing user={user} open={openAddBorrowing} setOpen={setOpenAddBorrowing} />
            </Grid>
        </CustomModal>
    );
};

export default AdminUserView;