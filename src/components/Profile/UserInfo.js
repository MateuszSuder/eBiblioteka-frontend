import React, { useState } from "react";
import {
    Grid,
    IconButton,
    Typography,
    Button,
    TextField,
    OutlinedInput,
    InputAdornment,
    Divider,
    InputLabel,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import theme from "./../theme/theme";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";

const UserInfo = () => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [showActualPassword, setShowActualPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showNewRepeatPassword, setShowNewRepeatPassword] = useState(false);
    const handleClickShowPassword = () =>
        setShowActualPassword((show) => !show);

    const handleClickShowNewPassword = () =>
        setShowNewPassword((show) => !show);
    const handleClickShowNewRepeatPassword = () =>
        setShowNewRepeatPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [address, setAddress] = useState({
        postal: "",
        city: "",
        street: "",
        houseNumber: "",
        apartmentNumber: "",
    });
    const [personalData, editPersonalData] = useState("false");
    const [changePassword, showChangePassword] = useState("false");
    return (
        <Grid container spacing={3} pt={3}>
            <Grid container item xs={5} direction="column">
                <Typography variant="h5" pb={3}>
                    Dane Osobowe
                </Typography>
                <Grid
                    container
                    item
                    sx={{ p: 2, border: "1px solid #e5e5e5" }}
                    justifyContent="space-between"
                >
                    <Grid
                        item
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Typography
                            variant="caption"
                            color={theme.palette.grey["400"]}
                        >
                            Dane osobowe
                        </Typography>
                    </Grid>
                    {personalData ? (
                        <>
                            <Grid
                                item
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Typography variant="h6">
                                    Imię Nazwisko
                                </Typography>
                            </Grid>

                            <Grid item>
                                <IconButton
                                    onClick={() =>
                                        editPersonalData((prev) => !prev)
                                    }
                                >
                                    <EditOutlinedIcon />
                                </IconButton>
                            </Grid>
                        </>
                    ) : (
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
                                            editPersonalData((prev) => !prev)
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
                                            editPersonalData((prev) => !prev)
                                        }
                                    >
                                        Anuluj
                                    </Button>
                                </Grid>
                            </Grid>
                        </>
                    )}
                </Grid>
            </Grid>
            <Grid container item xs={2} direction="column">
                <Typography variant="h5" pb={3}>
                    Zmiana hasła
                </Typography>
                <Grid
                    container
                    item
                    p={2}
                    sx={{ border: "1px solid #e5e5e5", minWidth: "250px" }}
                    justifyContent="space-between"
                >
                    {changePassword ? (
                        <>
                            <Grid
                                item
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Typography
                                    variant="caption"
                                    color={theme.palette.grey["400"]}
                                    pl={2}
                                >
                                    ******
                                </Typography>
                            </Grid>
                            <Grid item>
                                <IconButton
                                    onClick={() =>
                                        showChangePassword((prev) => !prev)
                                    }
                                >
                                    <EditOutlinedIcon />
                                </IconButton>
                            </Grid>
                        </>
                    ) : (
                        <>
                            <Grid
                                container
                                pt={2}
                                gap={3}
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item>
                                    <FormControl variant="outlined">
                                        <InputLabel htmlFor="actualPassword">
                                            Aktualne hasło
                                        </InputLabel>
                                        <OutlinedInput
                                            id="actualPassword"
                                            type={
                                                showActualPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={
                                                            handleClickShowPassword
                                                        }
                                                        onMouseDown={
                                                            handleMouseDownPassword
                                                        }
                                                        edge="end"
                                                    >
                                                        {showActualPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Aktualne hasło"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <FormControl>
                                        <InputLabel htmlFor="newPassword">
                                            Nowe hasło
                                        </InputLabel>
                                        <OutlinedInput
                                            id="newPassword"
                                            type={
                                                showNewPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={
                                                            handleClickShowNewPassword
                                                        }
                                                        onMouseDown={
                                                            handleMouseDownPassword
                                                        }
                                                        edge="end"
                                                    >
                                                        {showNewPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Nowe hasło"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <FormControl>
                                        <InputLabel htmlFor="newPasswordRepeat">
                                            Powtórz nowe hasło
                                        </InputLabel>
                                        <OutlinedInput
                                            id="newPasswordRepeat"
                                            type={
                                                showNewRepeatPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={
                                                            handleClickShowNewRepeatPassword
                                                        }
                                                        onMouseDown={
                                                            handleMouseDownPassword
                                                        }
                                                        edge="end"
                                                    >
                                                        {showNewPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Powtórz nowe hasło"
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justifyContent={"space-between"}
                                pt={3}
                            >
                                <Grid item>
                                    <Button variant="contained">Zapisz</Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        onClick={() =>
                                            showChangePassword((prev) => !prev)
                                        }
                                        variant="contained"
                                        color="warning"
                                    >
                                        Anuluj
                                    </Button>
                                </Grid>
                            </Grid>
                        </>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default UserInfo;
