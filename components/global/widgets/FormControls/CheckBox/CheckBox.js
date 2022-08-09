import React from 'react';
import { Checkbox, FormControl, FormControlLabel } from "@mui/material";

function CheckBox(props) {
    const { name, label, value, onChange } = props;

    const convertToDefaultPara = (name, value) => ({
        target: {
            name, value,
        }
    });

    return (
        <>
            <FormControl varient="outlined">
                <FormControlLabel
                    control={
                        <Checkbox
                            name={name}
                            color="secondary"
                            checked={value}
                            onChange={
                                event => onChange(
                                    convertToDefaultPara(name, event.target.checked)
                                )
                            }
                        />
                    }
                    label={label}
                />
            </FormControl>
        </>
    )
}

export default CheckBox;
