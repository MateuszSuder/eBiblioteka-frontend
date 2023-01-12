import React from "react";
import FormControl from "@mui/material/FormControl";
import { FormHelperText, InputLabel, Input } from "@mui/material";

const UserInfoPersonalDataInput = ({
    id,
    label,
    value,
    error,
    handleChange,
    inputProps,
    type,
    endAdornment,
}) => {
    return (
        <FormControl required variant="standard">
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <Input
                id={id}
                value={value}
                type={type}
                onChange={handleChange}
                error={!!error}
                label={label}
                inputProps={inputProps}
                endAdornment={endAdornment}
            />
            <FormHelperText error={!!error} sx={{ m: 0 }}>
                {error ? error : " "}
            </FormHelperText>
        </FormControl>
    );
};

export default UserInfoPersonalDataInput;
