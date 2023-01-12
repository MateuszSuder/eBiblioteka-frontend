import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import {
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    Input,
    OutlinedInput,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

const UserInfoPasswordInput = ({
    variant,
    id,
    handleChange,
    value,
    error,
    label,
}) => {
    const [show, setShow] = useState(false);
    const VariantedInput = variant === "outlined" ? OutlinedInput : Input;
    return (
        <Grid item>
            <FormControl fullWidth required>
                <InputLabel htmlFor={id}>{label}</InputLabel>
                {
                    <VariantedInput
                        id={id}
                        value={value}
                        variant={variant}
                        onChange={handleChange}
                        type={show ? "text" : "password"}
                        error={!!error}
                        label={label}
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
                }
                <FormHelperText error={!!error} sx={{ m: 0 }}>
                    {error ? error : " "}
                </FormHelperText>
            </FormControl>
        </Grid>
    );
};

export default UserInfoPasswordInput;
