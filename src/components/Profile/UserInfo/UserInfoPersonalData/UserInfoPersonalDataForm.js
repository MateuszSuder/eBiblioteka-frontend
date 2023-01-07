import React, {useState} from 'react';
import {Button, Divider, Grid, TextField, Typography} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import theme from "../../../theme/theme";

const UserInfoPersonalDataForm = ({setShowForm}) => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [address, setAddress] = useState({
        postal: "",
        city: "",
        street: "",
        houseNumber: "",
        apartmentNumber: "",
    });

    return (
        <>
            <Grid container spacing={3}>
                <Grid container item xs={6} direction="column">
                    <TextField
                        required
                        id="user-firstName"
                        label="Imię"
                        variant="standard"
                        value={firstName}
                        onChange={(e) =>
                            setFirstName(e.target.value)
                        }
                    />
                </Grid>
                <Grid container item xs={6} direction="column">
                    <TextField
                        required
                        id="user-lastName"
                        label="Nazwisko"
                        variant="standard"
                        value={lastName}
                        onChange={(e) =>
                            setLastName(e.target.value)
                        }
                    />
                </Grid>
                <Grid container item xs={6} direction="column">
                    <DatePicker
                        disableFuture
                        label="Data urodzenia"
                        value={dateOfBirth}
                        onChange={(dateOfBirth) => {
                            setDateOfBirth(dateOfBirth);
                        }}
                        renderInput={(params) => (
                            <TextField
                                required
                                variant="standard"
                                {...params}
                            />
                        )}
                    />
                </Grid>

                <Grid container item xs={6} direction="column">
                    <TextField
                        required
                        id="user-email"
                        label="Email"
                        placeholder="jan.nowak@gmail.com"
                        variant="standard"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} mt={5}>
                <Typography
                    variant="caption"
                    color={theme.palette.grey["600"]}
                >
                    Adres
                </Typography>
                <Divider />
            </Grid>
            <Grid container spacing={2}>
                <Grid container item xs={4} direction="column">
                    <TextField
                        required
                        id="user-address-postal"
                        label="Kod pocztowy"
                        variant="standard"
                        value={address.postal}
                        onChange={(e) =>
                            setAddress({
                                ...address,
                                postal: e.target.value,
                            })
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
                            setAddress({
                                ...address,
                                city: e.target.value,
                            })
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
                            setAddress({
                                ...address,
                                street: e.target.value,
                            })
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
                gap={2}
                direction="row"
                justifyContent="end"
                mt={3}
            >
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={() =>
                            setShowForm((prev) => !prev)
                        }
                    >
                        Zapisz
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={() =>
                            setShowForm((prev) => !prev)
                        }
                    >
                        Anuluj
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default UserInfoPersonalDataForm;