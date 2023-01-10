import React, { useState } from "react";
import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
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
    function validateEmail(email) {
        const regex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return regex.test(email);
    }
    function validate(key, value) {
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

        if (!value) {
            setErrors((prev) => ({
                ...prev,
                ...(key in personalData
                    ? { [key]: "Uzupełnij pole" }
                    : key in personalData.address
                    ? { address: { ...prev.address, [key]: "Uzupełnij pole" } }
                    : {}),
            }));
        }
        if (key === "email") {
            console.log(key);
            if (!validateEmail(value)) {
                setErrors((prev) => ({
                    ...prev,
                    [key]: "Podaj prawidłowy email",
                }));
            }
        }
    }

    const handleChange = (e) => {
        const value = e.target.value;

        if (e.target.id in personalData) {
            validate(e.target.id, value);
            setPersonalData({
                ...personalData,
                [e.target.id]: value,
            });

            return;
        }
        if (e.target.id in personalData.address) {
            validate(e.target.id, value);
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
        Object.keys(personalData).forEach((key) => {
            validate(key, personalData[key]);
        });

        Object.keys(personalData.address).forEach((key) => {
            validate(`address.${key}`, personalData.address[key]);
            console.log(key, personalData.address[key]);
        });
    };

    return (
        <>
            <Grid container spacing={3}>
                <Grid container item xs={6} direction="column">
                    <UserInfoPersonalDataInput
                        id="firstName"
                        label="Imię"
                        value={personalData.firstName}
                        handleChange={handleChange}
                        error={errors.firstName}
                    />
                </Grid>
                <Grid container item xs={6} direction="column">
                    <UserInfoPersonalDataInput
                        id="lastName"
                        label="Nazwisko"
                        value={personalData.lastName}
                        handleChange={handleChange}
                        error={errors.lastName}
                    />
                </Grid>
                <Grid container item xs={6} direction="column">
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
                            <TextField
                                required
                                variant="standard"
                                {...params}
                                value={personalData.dateOfBirth}
                            />
                        )}
                    />
                </Grid>

                <Grid container item xs={6} direction="column">
                    <UserInfoPersonalDataInput
                        id="email"
                        label="Email"
                        value={personalData.email}
                        handleChange={handleChange}
                        error={errors.email}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} mt={5}>
                <Typography variant="caption" color={theme.palette.grey["600"]}>
                    Adres
                </Typography>
                <Divider />
            </Grid>
            <Grid container spacing={2}>
                <Grid container item xs={4} direction="column">
                    <UserInfoPersonalDataInput
                        id="postal"
                        label="Kod pocztowy"
                        value={personalData.address.postal}
                        handleChange={handleChange}
                        error={errors.address.postal}
                    />
                </Grid>
                <Grid container item xs={8} direction="column">
                    <UserInfoPersonalDataInput
                        id="city"
                        label="Miasto"
                        value={personalData.address.city}
                        handleChange={handleChange}
                        error={errors.address.city}
                    />
                </Grid>
                <Grid container item xs={12} direction="column">
                    <UserInfoPersonalDataInput
                        id="street"
                        label="Ulica"
                        value={personalData.address.street}
                        handleChange={handleChange}
                        error={errors.address.street}
                    />
                </Grid>
                <Grid container item xs={6} direction="column">
                    <UserInfoPersonalDataInput
                        id="houseNumber"
                        label="Nr domu"
                        value={personalData.address.houseNumber}
                        handleChange={handleChange}
                        error={errors.address.houseNumber}
                    />
                </Grid>
                <Grid container item xs={6} direction="column">
                    <UserInfoPersonalDataInput
                        id="apartmentNumber"
                        label="Nr mieszkania"
                        value={personalData.address.apartmentNumber}
                        handleChange={handleChange}
                        error={errors.address.apartmentNumber}
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
