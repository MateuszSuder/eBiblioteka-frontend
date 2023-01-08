import React, {useEffect, useState} from 'react';
import CustomModal from "../../../CustomModal";
import useFindUser from "../../../../hooks/useFindUser";
import {FormControl, Grid, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import ColorAvatar from "../../../ColorAvatar";
import USER_ROLES from "../../../../enums/USER_ROLES";
import FullWidthButton from "../../../FullWidthButton";

const AdminUserDelete = ({userId, close}) => {
    return (
        <>Delete</>
    )
}

const AdminUserBlock = ({userId, close}) => {
    return (
        <>Block</>
    )
}

const AdminUserModify = ({userId, close}) => {
    const [role, setRole] = useState("");
    const user = useFindUser(userId);

    useEffect(() => {
        if(user) {
            setRole(user.role);
        }

        return () => setRole(null);
    }, [user])

    if(!user) return (
        <></>
    )

    if(!role) return (
        <></>
    )

    const saveUser = () => {
        if(user.role !== role) console.log(`${userId}: ${user.role} -> ${role}`);
        else console.log("No changes");
        close();
    }

    return (
        <Grid container justifyContent="center" gap={2}>
            <Grid item container justifyContent="center" xs={12}>
                <ColorAvatar text={`${user.name} ${user.lastName}`} />
            </Grid>
            <Grid item xs={12}>
                <Typography align="center" variant="h6">
                    {`${user.name} ${user.lastName}`}
                </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
                <FormControl fullWidth>
                    <InputLabel id="user-role-label">
                        Rola użytkownika
                    </InputLabel>
                    <Select
                        labelId="user-role-label"
                        id="user-role"
                        label="Rola użytkownika"
                        value={role}
                        onChange={e => setRole(e.target.value)}
                    >
                        {
                            Object.entries(USER_ROLES).map(([value, label]) => (
                                <MenuItem value={value} key={`${userId}-role-${value}`}>{label[0].toUpperCase() + label.slice(1)}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item container xs={12} md={8} justifyContent="space-between">
                <Grid item xs={5}>
                    <FullWidthButton variant="outlined" onClick={close}>
                        Anuluj
                    </FullWidthButton>
                </Grid>
                <Grid item xs={5}>
                    <FullWidthButton variant="contained" onClick={saveUser}>
                        Zatwierdź
                    </FullWidthButton>
                </Grid>
            </Grid>
        </Grid>
    )
}

/**
 * @param open
 * @param setOpen
 * @param userId
 * @param {"MODIFY" | "BLOCK" | "DELETE"} action
 * @return {JSX.Element}
 * @constructor
 */
const AdminUserAction = ({open, setOpen, userId, action}) => {
    const close = () => setOpen(false);
    const Component = (() => {
        switch (action) {
            case "MODIFY":
                return AdminUserModify
            case "BLOCK":
                return AdminUserBlock
            case "DELETE":
                return AdminUserDelete
            default:
                return (
                    <></>
                )
        }
    })()

    if(!userId) return (
        <></>
    )

    return (
        <CustomModal open={open} setOpen={setOpen}>
            <Component userId={userId} close={close} />
        </CustomModal>
    )
};

export default AdminUserAction;