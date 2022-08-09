import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup
} from "@mui/material";
import React from 'react';

function RadioControls(props) {
    const { name, value, label, onChange, items, color } = props;
    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <RadioGroup
                row
                name={name}
                value={value}
                onChange={onChange}
            >
                {
                    items.map((item, index) => (
                        <FormControlLabel
                            key={index}
                            value={item.id}
                            label={item.title}
                            control={<Radio color={color} />}
                        />
                    ))
                }
            </RadioGroup>
        </FormControl>
    )
}

export default RadioControls;
