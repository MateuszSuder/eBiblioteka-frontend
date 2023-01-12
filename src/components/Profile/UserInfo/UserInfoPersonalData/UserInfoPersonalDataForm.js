import React, { useState } from "react";
import {
    Button,
    Divider,
    FormControl,
    Grid,
    TextField,
    Typography,
    FormHelperText,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import theme from "../../../theme/theme";
import UserInfoPersonalDataInput from "./UserInfoPersonalDataInput";
const UserInfoPersonalDataForm = ({ setShowForm }) => {
    const [personalData, setPersonalData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        dateOfBirth: null,
        address: {
            postal: "",
            city: "",
            street: "",
            houseNumber: "",
            apartmentNumber: "",
        },
    });
    const [errors, setErrors] = useState({
        email: false,
        firstName: false,
        lastName: false,
        dateOfBirth: false,
        address: {
            postal: false,
            city: false,
            street: false,
            houseNumber: false,
            apartmentNumber: false,
        },
    });

    function setErrorIfEmpty(key, value) {
        if (!value) {
            setErrors((prev) => ({
                ...prev,
                ...(key in personalData
                    ? { [key]: "Uzupełnij pole" }
                    : key in personalData.address
                    ? {
                          address: {
                              ...prev.address,
                              [key]: "Uzupełnij pole",
                          },
                      }
                    : {}),
            }));
        }
    }
    function validateIfEmpty(personalData) {
        for (const [key, value] of Object.entries(personalData)) {
            setErrorIfEmpty(key, value);
        }

        for (const [key, value] of Object.entries(personalData.address)) {
            setErrorIfEmpty(key, value);
        }
    }
    const validateOnChange = (e) => {
        let value = e.target.value;
        let id = e.target.id;

        console.log(id);
        const fieldsWithLettersOnly = [
            "firstName",
            "lastName",
            "city",
            "street",
        ];
        if (fieldsWithLettersOnly.includes(id)) {
            value = value.replace(/[^a-zA-Z]+/gi, "");
        }

        if (id === "postal") {
            if (value.length === 2 && !value.endsWith("-")) {
                value = value.replace(/(\d{2})/, "$1-");
            } else if (value.endsWith("-") && value.length === 3) {
                value = value.slice(0, -1);
            } else if (value.length === 6) {
                value = value.replace(/(\d{2})(\d{4})/, "$1-$2");
            } else if (!/^\d+$/.test(value) && !/^\d+-\d+$/.test(value)) {
                value = value.replace(/[^0-9]+/gi, "");
            }
        }
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
        console.log("3", value);
        if (id in personalData) {
            setPersonalData({
                ...personalData,
                [id]: value,
            });
        }
        if (e.target.id in personalData.address) {
            setPersonalData({
                ...personalData,
                address: {
                    ...personalData.address,
                    [e.target.id]: value,
                },
            });
        }
    };

    const submit = () => {
        setErrors({
            email: false,
            firstName: false,
            lastName: false,
            dateOfBirth: false,
            address: {
                postal: false,
                city: false,
                street: false,
                houseNumber: false,
                apartmentNumber: false,
            },
        });
        validateIfEmpty(personalData);
        console.log(personalData, errors);
    };
    return (
        <>
            <Grid container spacing={3}>
                <Grid container item xs={6} direction="column">
                    <UserInfoPersonalDataInput
                        id="firstName"
                        label="Imię"
                        value={personalData.firstName}
                        handleChange={validateOnChange}
                        error={errors.firstName}
                        inputProps={{
                            maxLength: 30,
                            pattern: "[a-zA-Z]+",
                        }}
                    />
                </Grid>
                <Grid container item xs={6} direction="column">
                    <UserInfoPersonalDataInput
                        id="lastName"
                        label="Nazwisko"
                        value={personalData.lastName}
                        handleChange={validateOnChange}
                        error={errors.lastName}
                        inputProps={{
                            maxLength: 30,
                            pattern: "[a-zA-Z]+",
                        }}
                    />
                </Grid>
                <Grid container item xs={6} direction="column">
                    <FormControl
                        onChange={validateOnChange}
                        error={!!errors.dateOfBirth}
                    >
                        <DatePicker
                            disableFuture
                            label="Data urodzenia"
                            id="dateOfBirth"
                            value={personalData.dateOfBirth}
                            onChange={(newValue) =>
                                setPersonalData({
                                    ...personalData,
                                    dateOfBirth: newValue,
                                })
                            }
                            renderInput={(params) => (
                                <>
                                    <TextField
                                        name="dateOfBirth"
                                        required
                                        variant="standard"
                                        {...params}
                                        error={
                                            errors.dateOfBirth
                                                ? !!errors.dateOfBirth
                                                : false
                                        }
                                        value={personalData.dateOfBirth}
                                    />
                                </>
                            )}
                        />
                        <FormHelperText sx={{ m: 0 }}>
                            {errors.dateOfBirth ? errors.dateOfBirth : ""}
                        </FormHelperText>
                    </FormControl>
                </Grid>

                <Grid container item xs={6} direction="column">
                    <UserInfoPersonalDataInput
                        id="email"
                        label="Email"
                        value={personalData.email}
                        handleChange={validateOnChange}
                        error={errors.email}
                        inputProps={{
                            pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
                            max: 30,
                        }}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} mt={2}>
                <Typography variant="caption" color={theme.palette.grey["600"]}>
                    Adres
                </Typography>
                <Divider />
            </Grid>
            <Grid container spacing={2} mt={1}>
                <Grid container item xs={4} direction="column">
                    <UserInfoPersonalDataInput
                        id="postal"
                        label="Kod pocztowy"
                        handleChange={validateOnChange}
                        value={personalData.address.postal}
                        inputProps={{
                            min: 6,
                            maxLength: 6,
                        }}
                        error={errors.address.postal}
                    />
                </Grid>
                <Grid container item xs={8} direction="column">
                    <UserInfoPersonalDataInput
                        id="city"
                        label="Miasto"
                        value={personalData.address.city}
                        handleChange={validateOnChange}
                        error={errors.address.city}
                        inputProps={{
                            maxLength: 30,
                        }}
                    />
                </Grid>
                <Grid container item xs={12} direction="column">
                    <UserInfoPersonalDataInput
                        id="street"
                        label="Ulica"
                        value={personalData.address.street}
                        handleChange={validateOnChange}
                        error={errors.address.street}
                        inputProps={{
                            maxLength: 50,
                        }}
                    />
                </Grid>
                <Grid container item xs={6} direction="column">
                    <UserInfoPersonalDataInput
                        id="houseNumber"
                        label="Nr domu"
                        value={personalData.address.houseNumber}
                        handleChange={validateOnChange}
                        error={errors.address.houseNumber}
                        inputProps={{
                            maxLength: 6,
                        }}
                    />
                </Grid>
                <Grid container item xs={6} direction="column">
                    <UserInfoPersonalDataInput
                        id="apartmentNumber"
                        label="Nr mieszkania"
                        value={personalData.address.apartmentNumber}
                        handleChange={validateOnChange}
                        error={errors.address.apartmentNumber}
                        inputProps={{
                            maxLength: 6,
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container gap={2} direction="row" justifyContent="end" mt={3}>
                <Grid item>
                    <Button variant="contained" onClick={submit}>
                        Zapisz
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={() => setShowForm((prev) => !prev)}
                    >
                        Anuluj
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default UserInfoPersonalDataForm;
