import React, { useState } from "react";
import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import theme from "../../components/theme/theme";
import { Link } from "react-router-dom";

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [address, setAddress] = useState({
        postal: "",
        city: "",
        street: "",
        houseNumber: "",
        apartmentNumber: "",
    });
    const date = new Date().toISOString().substring(0, 10);
    const submit = () => {
        console.log(email, password, firstName, lastName, address);
    };
    return (
        <Grid py={4} px={3} container direction="column" gap={1}>
            <Grid item py={2} xs={12}>
                <Typography variant="h5" align="center" pb={1}>
                    Zarejestruj się
                </Typography>
                <Divider />
            </Grid>
            <Grid container spacing={3}>
                <Grid container item xs={6} direction="column">
                    <TextField
                        required
                        id="user-firstName"
                        label="Imię"
                        variant="standard"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Grid>
                <Grid container item xs={6} direction="column">
                    <TextField
                        required
                        id="user-lastName"
                        label="Nazwisko"
                        variant="standard"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Grid>
                <Grid container item xs={6} direction="column">
                    <TextField
                        required
                        id="user-dateOfBirth"
                        label="Data urodzenia"
                        placeholder={date}
                        variant="standard"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                </Grid>
                <Grid container item xs={6} direction="column">
                    <TextField
                        required
                        id="user-phoneNumber"
                        label="Numer telefonu"
                        variant="standard"
                        value={phoneNumber}
                        onChange={(e) => setphoneNumber(e.target.value)}
                    />
                </Grid>
                <Grid container item xs={12} direction="column">
                    <TextField
                        required
                        id="user-email"
                        label="Email"
                        placeholder="jan.nowak@gmail.com"
                        variant="standard"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid>
                <Grid container item xs={6} direction="column">
                    <TextField
                        required
                        id="user-password"
                        type="password"
                        label="Hasło"
                        placeholder="********"
                        variant="standard"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>
                <Grid container item xs={6} direction="column">
                    <TextField
                        required
                        id="user-password-repeat"
                        type="password"
                        label="Powtórz hasło"
                        placeholder="********"
                        variant="standard"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Typography
                variant="caption"
                mt={2}
                color={theme.palette.grey["600"]}
            >
                Adres
            </Typography>
            <Divider />
            <Grid container spacing={2}>
                <Grid container item xs={4} direction="column">
                    <TextField
                        required
                        id="user-address-postal"
                        label="Kod pocztowy"
                        variant="standard"
                        value={address.postal}
                        onChange={(e) =>
                            setAddress({ ...address, postal: e.target.value })
                        }
                    />
                </Grid>
                <Grid container item xs={8} direction="column">
                    <TextField
                        required
                        id="user-address-city"
                        label="Miasto"
                        variant="standard"
                        value={address.city}
                        onChange={(e) =>
                            setAddress({ ...address, city: e.target.value })
                        }
                    />
                </Grid>
                <Grid container item xs={12} direction="column">
                    <TextField
                        required
                        id="user-address-street"
                        label="Ulica"
                        variant="standard"
                        value={address.street}
                        onChange={(e) =>
                            setAddress({ ...address, street: e.target.value })
                        }
                    />
                </Grid>
                <Grid container item xs={6} direction="column">
                    <TextField
                        required
                        id="user-address-houseNumber"
                        label="Nr domu"
                        variant="standard"
                        value={address.houseNumber}
                        onChange={(e) =>
                            setAddress({
                                ...address,
                                houseNumber: e.target.value,
                            })
                        }
                    />
                </Grid>
                <Grid container item xs={6} direction="column">
                    <TextField
                        required
                        id="user-address-apartmentNumber"
                        label="Nr mieszkania"
                        variant="standard"
                        value={address.apartmentNumber}
                        onChange={(e) =>
                            setAddress({
                                ...address,
                                apartmentNumber: e.target.value,
                            })
                        }
                    />
                </Grid>
            </Grid>
            <Grid
                container
                spacing={0}
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
                        Zarejestruj
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant="caption"
                        color={theme.palette.grey["400"]}
                    >
                        <Link to="/login">Masz już konto? Zaloguj się</Link>
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default RegisterForm;
