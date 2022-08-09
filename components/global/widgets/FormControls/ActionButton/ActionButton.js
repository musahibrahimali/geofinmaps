import React from 'react';
import {Button, IconButton} from "@mui/material";
import { ActionButtonStyles } from "./ActionButtonStyles";
import {Fingerprint} from "@mui/icons-material";

const ActionButton = (props) => {
    const styles = ActionButtonStyles();
    const { color, children, onClick, disabled } = props;

    return (
        <React.Fragment>
            <IconButton
                disabled={disabled || false}
                color={color || "primary"}
                className={`${styles.root}  ${styles[color]}`}
                onClick={onClick}>
                {children}
            </IconButton>
        </React.Fragment>
    );
};

export default ActionButton;