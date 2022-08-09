import React from 'react';
import { InputAdornment, TextField } from "@mui/material";

function InputField(props) {
    const { name, label, error = null, maxRows, rows, multiline, placeHolder, onChange, value, inputIcon, required, endAdornment, ...other } = props;

    return (
        <TextField
            required={required || false}
            variant="outlined"
            label={label}
            name={name}
            multiline={multiline || false}
            value={value}
            maxRow={maxRows}
            rows={rows}
            placeholder={placeHolder}
            onChange={onChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        {inputIcon}
                    </InputAdornment>
                ),
                endAdornment: (endAdornment),
            }}
            {...(error && { error: true, helperText: error })}
            {...other}
        />
    )
}

export default InputField;
