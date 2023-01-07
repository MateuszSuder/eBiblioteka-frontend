import React, {useState} from 'react';
import FormControl from "@mui/material/FormControl";
import {FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

const UserInfoPasswordInput = ({title, id, handleChange, value, error}) => {
    const [show, setShow] = useState(false);

    return (
        <Grid item>
            <FormControl variant="outlined">
                <InputLabel htmlFor={id}>
                    {title}
                </InputLabel>
                <OutlinedInput
                    id={id}
                    value={value}
                    onChange={handleChange}
                    type={
                        show
                            ? "text"
                            : "password"
                    }
                    error={!!error}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={
                                    () => setShow(prev => !prev)
                                }
                                edge="end"
                            >
                                {show ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                    label={title}
                />
                <FormHelperText error={!!error}>{error ? error : " "}</FormHelperText>
            </FormControl>
        </Grid>
    );
};

export default UserInfoPasswordInput;