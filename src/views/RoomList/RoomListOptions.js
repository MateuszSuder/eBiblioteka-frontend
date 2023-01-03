import React, {useState} from 'react';
import {DatePicker} from "@mui/x-date-pickers";
import {Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import moment from "moment/moment";

const SORT = [
    {key: null, value: "Brak"},
    {key: "priceAsc", value: "Cena rosnąco"},
    {key: "priceDesc", value: "Cena malejąco"}
]


const RoomListOptions = () => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [capacity, setCapacity] = useState(2);
    const [sort, setSort] = useState(SORT[0].key)
    const [errors, setErrors] = useState({ from: false, to: false });

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

    return (
        <Grid container mb={2} gap={1}>
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
                                <IconButton style={{position: "absolute", top: ".5rem", margin: "auto", right: "2rem"}}>
                                    <ClearIcon onClick={() => setFromDate(null)}/>
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
                                <IconButton style={{position: "absolute", top: ".5rem", margin: "auto", right: "2rem"}}>
                                    <ClearIcon onClick={() => setToDate(null)}/>
                                </IconButton>
                            </div>
                        }
                    />
                </FormControl>
            </Grid>
            <Grid item xs={2}>
                <FormControl fullWidth>
                    <TextField type="number" label="Ilość osób" value={capacity}
                               onChange={e => setCapacity(e.target.value)}/>
                </FormControl>
            </Grid>
            <Grid item xs={2}>
                <FormControl fullWidth>
                    <InputLabel id="sort-label">Sortuj po</InputLabel>
                    <Select
                        labelId="sort-label"
                        label="Sortuj po"
                        id="sort"
                        value={sort}
                        onChange={e => setSort(e.target.value)}
                    >
                        {SORT.map(s => (
                            <MenuItem value={s.key} key={s.key}>{s.value}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item container xs={2} alignItems="center">
                <Button variant="contained" size="large" onClick={filter}>
                    Filtruj
                </Button>
            </Grid>
        </Grid>
    );
};

export default RoomListOptions;