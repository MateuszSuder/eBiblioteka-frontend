import React, {useEffect, useState} from 'react';
import CustomModal from "../../../CustomModal";
import {FormControl, Grid, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import ColorAvatar from "../../../ColorAvatar";
import USER_ROLES from "../../../../enums/USER_ROLES";
import FullWidthButton from "../../../FullWidthButton";
import {useMutation, useQueryClient} from "react-query";
import axios from "axios";
import useSnackbar from "../../../../context/SnackbarProvider";

const AdminUserDelete = ({user, close}) => {
    const deleteUser = () => {
        console.log(`${user._id} delete`);
        close();
    }

    return (
        <Grid item container xs={12} md={8} justifyContent="space-between">
            <Grid item xs={5}>
                <FullWidthButton variant="outlined" onClick={close}>
                    Anuluj
                </FullWidthButton>
            </Grid>
            <Grid item xs={5}>
                <FullWidthButton variant="contained" color="error" onClick={deleteUser}>
                    Usuń
                </FullWidthButton>
            </Grid>
        </Grid>
    )
}

const AdminUserBlock = ({user, close}) => {
    const blockUser = () => {
        console.log(`${user._id} block`);
        close();
    }

    return (
        <Grid item container xs={12} md={8} justifyContent="space-between">
            <Grid item xs={5}>
                <FullWidthButton variant="outlined" onClick={close}>
                    Anuluj
                </FullWidthButton>
            </Grid>
            <Grid item xs={5}>
                <FullWidthButton variant="contained" color="error" onClick={blockUser}>
                    Zablokuj
                </FullWidthButton>
            </Grid>
        </Grid>
    )
}

const AdminUserModify = ({user, close}) => {
    const { addSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const roleMutation = useMutation((previousRole) => axios.put(`/api/user/${user._id}`, { role }), {
        onSuccess: async () => {
            addSnackbar("Zmieniono rolę użytkownika", "success");
            await queryClient.invalidateQueries({queryKey: [`users`]});
        },
        onError: () => {
            addSnackbar("Wystąpił błąd podczas zmiany roli", "error");
        }
    })
    const [role, setRole] = useState("");

    useEffect(() => {
        if(user) {
            setRole(user.role);
        }

        return () => setRole(null);
    }, [user])

    if(!role) return (
        <></>
    )

    const saveUser = () => {
        if(user.role !== role) {
            roleMutation.mutate();
        } else {
            addSnackbar("Rola niezmieniona", "warning");
        }
        close();
    }

    return (
        <>
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
                                <MenuItem value={value} key={`${user._id}-role-${value}`}>{label[0].toUpperCase() + label.slice(1)}</MenuItem>
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
        </>
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
const AdminUserAction = ({open, setOpen, user, action}) => {

    if(!user) return (
        <></>
    )

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

    return (
        <CustomModal open={open} setOpen={setOpen}>
            <Grid container justifyContent="center" gap={2}>
                <Grid item container justifyContent="center" xs={12}>
                    <ColorAvatar text={`${user.name} ${user.lastName}`} />
                </Grid>
                <Grid item xs={12}>
                    <Typography align="center" variant="h6">
                        {`${user.name} ${user.lastName}`}
                    </Typography>
                </Grid>
                <Component user={user} close={close} />
            </Grid>
        </CustomModal>
    )
};

export default AdminUserAction;