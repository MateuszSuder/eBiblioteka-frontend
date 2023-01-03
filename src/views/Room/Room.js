import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {
    Button,
    Card,
    Divider,
    FormControl,
    Grid,
    IconButton,
    Skeleton,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import ClearIcon from "@mui/icons-material/Clear";
import moment from "moment";
import roomList from "../../mock/roomList";

const Room = () => {
    const [room, setRoom] = useState();
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [errors, setErrors] = useState({ from: false, to: false });
    const {roomId} = useParams();

    const filter = () => {
        if((fromDate && !toDate) || (!fromDate && toDate)) {
            if(!fromDate) setErrors({...errors, from: true});
            if(!toDate) setErrors({...errors, to: true});
        }
    }

    const handleSetFromDate = (value) => {
        setErrors({ ...errors, from: false });
        setFromDate(value);
    }

    const handleSetToDate = (value) => {
        setErrors({ ...errors, to: false });
        setToDate(value);
    }

    /**
     * @param {Date} date
     */
    const disableFromDates = (date) => {
        if(!toDate) return false;
        return date > moment(toDate).subtract(1, "days");
    }

    /**
     * @param {Date} date
     */
    const disableToDates = (date) => {
        if(!fromDate) return false;
        return date < moment(fromDate).add(1, "days");
    }

    useEffect(() => {
        setRoom(roomList.rooms.find(room => room._id === parseInt(roomId)));
    }, [roomId, room])

    if (!room) return (
        <Stack>
            <Skeleton variant="text"/>
        </Stack>
    )

    return (
        <Grid container flexDirection="column" my={3}>
            <Grid item mb={2}>
                <Typography align="center" variant="h5">
                    {room.name}
                </Typography>
            </Grid>
            <Divider/>
            <Grid item my={2}>
                <Typography align="center" variant="body1">
                    {room.description}
                </Typography>
            </Grid>
            <Card elevation={4}>
                <Grid item container my={2}>
                    <Grid item container justifyContent="center" gap={2}>
                        <Grid item xs={5}>
                            <Typography align="right">
                                Piętro
                            </Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography>
                                {room.floor}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} justifyContent="center" gap={2}>
                        <Grid item xs={5} align="right">
                            <Typography>
                                Numer pokoju
                            </Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography>
                                {room.roomNumber}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} justifyContent="center" gap={2}>
                        <Grid item xs={5} align="right">
                            <Typography>
                                Cena za noc
                            </Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography>
                                {room.price} zł
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container xs={12} flexDirection="row" justifyContent="center" gap={5}>
                    <Grid item xs={2}>
                        <FormControl>
                            <DatePicker
                                label="Od"
                                value={fromDate}
                                onChange={newValue => handleSetFromDate(newValue)}
                                shouldDisableDate={disableFromDates}
                                disablePast
                                renderInput={(params) =>
                                    <div style={{position: "relative", display: "inline-block"}}>
                                        <TextField id="date-to" {...params} error={errors.from} />
                                        <IconButton style={{position: "absolute", top: ".5rem", margin: "auto", right: "2rem"}} onClick={() => setFromDate(null)}>
                                            <ClearIcon />
                                        </IconButton>
                                    </div>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl>
                            <DatePicker
                                label="Do"
                                value={toDate}
                                onChange={newValue => handleSetToDate(newValue)}
                                shouldDisableDate={disableToDates}
                                disablePast
                                renderInput={(params) =>
                                    <div style={{position: "relative", display: "inline-block"}}>
                                        <TextField id="date-to" {...params} error={errors.to} />
                                        <IconButton style={{position: "absolute", top: ".5rem", margin: "auto", right: "2rem"}} onClick={() => setToDate(null)}>
                                            <ClearIcon />
                                        </IconButton>
                                    </div>
                                }
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid item xs={12} my={3}>
                    <Divider />
                </Grid>
                <Grid item container xs={12} alignItems="center" flexDirection="column" gap={2} >
                    <Grid item container xs={4}>
                        <TextField variant="outlined" label="Numer karty" fullWidth />
                    </Grid>
                    <Grid item container xs={4} justifyContent="space-between">
                        <Grid item xs={5}>
                            <TextField variant="outlined" label="Data ważności" fullWidth />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField variant="outlined" label="CVV" fullWidth />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container xs={12} justifyContent="center" my={2}>
                    <Button variant="contained" size="large" onClick={filter}>
                        Zarezerwuj
                    </Button>
                </Grid>
            </Card>
        </Grid>
    );
};

export default Room;