import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';

function CustomDatePicker(props) {
    const { name, label, value, onChange } = props;

    const convertToDefaultPara = (name, value) => ({
        target: {
            name, value,
        }
    });

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                disableFuture
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                views={['year', 'month', 'day']}
                label={label}
                format="MMM/dd/yyyy"
                name={name}
                value={value}
                onChange={date => onChange(convertToDefaultPara(name, date))}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider >
    )
}

export default CustomDatePicker;
