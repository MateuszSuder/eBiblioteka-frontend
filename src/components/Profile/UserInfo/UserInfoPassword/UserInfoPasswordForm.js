import React, {useState} from "react";
import {Button, Grid} from "@mui/material";
import UserInfoPasswordInput from "./UserInfoPasswordInput";
import {useMutation} from "react-query";
import axios from "axios";
import useAuth from "../../../../context/AuthProvider";
import useSnackbar from "../../../../context/SnackbarProvider";

const UserInfoPasswordForm = ({ setChangePassword }) => {
    const { user, refetch } = useAuth();
    const { addSnackbar } = useSnackbar();
    const mutation = useMutation(() => axios.put(`/api/user/${user._id}`, {password: password.actualPassword, newPassword: password.newPassword}), {
        onError: (error) => {
            console.log(error);
            const message = error.response.data.errors[0];
            addSnackbar(message, "error");
        },
        onSuccess: () => {
            refetch();
            addSnackbar("Dane pomyślnie zmienione", "success");
        }
    });
    const [password, setPassword] = useState({
        actualPassword: "",
        newPassword: "",
        newPasswordRepeat: "",
    });

    const [errors, setErrors] = useState({
        actualPassword: false,
        newPassword: false,
        newPasswordRepeat: false,
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setPassword({
            ...password,
            [e.target.id]: value,
        });
    };

    const validate = () => {
        let failed = false;

        setErrors({
            actualPassword: false,
            newPassword: false,
            newPasswordRepeat: false,
        });

        for (const [key, value] of Object.entries(password)) {
            if (!value) {
                failed = true;
                setErrors((prev) => ({ ...prev, [key]: "Uzupełnij pole" }));
            }
        }

        if (password.newPassword !== password.newPasswordRepeat) {
            setErrors((prev) => ({
                ...prev,
                newPassword: "Hasła nie zgadzają się",
                newPasswordRepeat: "Hasła nie zgadzają się",
            }));
            return failed;
        }

        if (password.newPassword.length < 8) {
            setErrors((prev) => ({
                ...prev,
                newPassword: "Hasło musi mieć przynajmniej 8 znaków",
                newPasswordRepeat: "Hasło musi mieć przynajmniej 8 znaków",
            }));

            failed = true;
        }

        return failed;
    };

    const submit = () => {
        const invalid = validate();

        if(!invalid) {
            mutation.mutate();
        } else {
            addSnackbar("Nieprawidłowe dane", "error")
        }
    };

    return (
        <>
            <Grid
                container
                pt={2}
                gap={3}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <UserInfoPasswordInput
                    id="actualPassword"
                    label="Aktualne hasło"
                    value={password.actualPassword}
                    handleChange={handleChange}
                    error={errors.actualPassword}
                    variant="outlined"
                />
                <UserInfoPasswordInput
                    id="newPassword"
                    label="Nowe hasło"
                    value={password.newPassword}
                    handleChange={handleChange}
                    error={errors.newPassword}
                    variant="outlined"
                />
                <UserInfoPasswordInput
                    id="newPasswordRepeat"
                    label="Powtórz nowe hasło"
                    value={password.newPasswordRepeat}
                    handleChange={handleChange}
                    error={errors.newPasswordRepeat}
                    variant="outlined"
                />
            </Grid>
            <Grid
                container
                direction="row"
                justifyContent={"space-around"}
                pt={3}
            >
                <Grid item>
                    <Button variant="contained" onClick={submit}>
                        Zapisz
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        onClick={() => setChangePassword((prev) => !prev)}
                        variant="contained"
                        color="warning"
                    >
                        Anuluj
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default UserInfoPasswordForm;
