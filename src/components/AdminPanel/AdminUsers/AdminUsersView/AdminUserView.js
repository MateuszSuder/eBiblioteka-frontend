import React, {useState} from 'react';
import {Button, Grid, Typography} from "@mui/material";
import RoleChip from "../RoleChip";
import ColorAvatar from "../../../ColorAvatar";
import AdminUserReservations from "./AdminUserReservation";
import AdminUserBorrowings from "./AdminUserBorrowings";
import AdminUserAddBorrowing from "./AdminUserAddBorrowing";
import CustomModal from "../../../CustomModal";
import useFindUser from "../../../../hooks/useFindUser";

const AdminUserView = ({open, setOpen, id}) => {
    const [openAddBorrowing, setOpenAddBorrowing] = useState(false);
    const user = useFindUser(id)

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