import React, {useEffect, useState} from 'react';
import {Button, Grid, Modal, Typography} from "@mui/material";
import users from "../../../mock/users";
import RoleChip from "./RoleChip";
import ColorAvatar from "../../ColorAvatar";
import AdminUserReservations from "./AdminUserReservation";
import AdminUserBorrowings from "./AdminUserBorrowings";

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

const AdminUserView = ({open, setOpen, id}) => {
    const [user, setUser] = useState(users.find(user => user._id === id));

    useEffect(() => {
        // todo get user from api
        setUser(users.find(user => user._id === id));
    }, [id]);

    if (!user) return (
        <></>
    )

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <Grid container sx={style}>
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
                    <Button variant="contained">
                        Dodaj wypożyczenie
                    </Button>
                </Grid>
            </Grid>
        </Modal>
    );
};

export default AdminUserView;