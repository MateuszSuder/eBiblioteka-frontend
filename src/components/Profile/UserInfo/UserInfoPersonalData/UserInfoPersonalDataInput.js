import React from "react";
import FormControl from "@mui/material/FormControl";
import { FormHelperText, InputLabel, Input } from "@mui/material";

const UserInfoPersonalDataInput = ({
    id,
    label,
    value,
    error,
    handleChange,
}) => {
    return (
        <FormControl required variant="standard">
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <Input
                id={id}
                value={value}
                onChange={handleChange}
                type="text"
                error={!!error}
                label={label}
            />
            <FormHelperText error={!!error}>
                {error ? error : " "}
            </FormHelperText>
        </FormControl>
    );
};

export default UserInfoPersonalDataInput;
