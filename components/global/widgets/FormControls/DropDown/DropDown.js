import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from "@mui/material";

function DropDown(props) {
    const { name, label, value, error = null, onChange, options } = props;
    return (
        <>
            <FormControl
                variant="outlined"
                {...(error && { error: true })}
            >
                <InputLabel>{label}</InputLabel>
                <Select
                    name={name}
                    label={label}
                    value={value}
                    onChange={onChange}
                >
                    <MenuItem value="">None</MenuItem>
                    {
                        options.map(item => {
                            return (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.title}
                                </MenuItem>
                            );
                        })
                    }
                </Select>
                {error && <FormHelperText>{error}</FormHelperText>}
            </FormControl>
        </>
    )
}

export default DropDown;
