import React, { useState } from "react";
import {
    Button,
    Divider,
    Grid,
    Typography,
    InputAdornment,
    IconButton,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import theme from "../../components/theme/theme";

import UserInfoPersonalDataInput from "./../../components/Profile/UserInfo/UserInfoPersonalData/UserInfoPersonalDataInput";

const LoginForm = () => {
    const [show, setShow] = useState(false);
    const [personalData, setPersonalData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });

    function setErrorIfEmpty(key, value) {
        if (!value) {
            setErrors((prev) => ({
                ...prev,
                ...(key in personalData ? { [key]: "Uzupełnij pole" } : {}),
            }));
        }
    }
    function validateIfEmpty(personalData) {
        for (const [key, value] of Object.entries(personalData)) {
            setErrorIfEmpty(key, value);
        }
    }
    const validateOnChange = (e) => {
        let value = e.target.value;
        let id = e.target.id;

        if (id === "email") {
            value.match(
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
            )
                ? setErrors((prev) => ({
                      ...prev,
                      [id]: false,
                  }))
                : setErrors((prev) => ({
                      ...prev,
                      [id]: "Podaj prawidłowy email",
                  }));
        }
        id === "password" && value.length < 8
            ? setErrors((prev) => ({
                  ...prev,
                  password: "Hasło musi mieć min 8 znaków",
              }))
            : setErrors((prev) => ({
                  ...prev,
                  password: false,
              }));

        if (id in personalData) {
            setPersonalData({
                ...personalData,
                [id]: value,
            });
        }
    };
    const submit = () => {
        setErrors({
            email: false,
            password: false,
        });
        validateIfEmpty(personalData);
        console.log(personalData, errors);
    };

    return (
        <Grid py={4} px={3} container direction="column" gap={1}>
            <Grid item py={2} xs={12}>
                <Typography variant="h5" align="center" pb={1}>
                    Zaloguj się
                </Typography>
                <Divider />
            </Grid>
            <Grid container spacing={3}>
                <Grid container item xs={12} direction="column">
                    <UserInfoPersonalDataInput
                        id="email"
                        label="Email"
                        variant="standard"
                        value={personalData.email}
                        handleChange={validateOnChange}
                        error={errors.email}
                    />
                </Grid>
                <Grid container item xs={12} direction="column">
                    <UserInfoPersonalDataInput
                        id="password"
                        variant="standard"
                        type={show ? "text" : "password"}
                        label="Hasło"
                        value={personalData.password}
                        handleChange={validateOnChange}
                        error={errors.password}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShow((prev) => !prev)}
                                    edge="end"
                                >
                                    {show ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </Grid>
            </Grid>
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Grid container item xs={12} mt={2} mb={2}>
                    <Button
                        variant="contained"
                        style={{ minWidth: "50%", width: "100%" }}
                        onClick={submit}
                    >
                        Zaloguj
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant="caption"
                        color={theme.palette.grey["400"]}
                    >
                        <Link to="/register">
                            Nie masz konta? Zarejestruj się
                        </Link>
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default LoginForm;
