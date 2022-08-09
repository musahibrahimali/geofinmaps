import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { FormButton } from "../controls";
import NotListedLocationOutlinedIcon from '@mui/icons-material/NotListedLocationOutlined';
import { ConfirmDialogStyles } from "./ConfirmDialogStyles";

const ConfirmDialog = (props) => {

    const styles = ConfirmDialogStyles();
    const { confirmDialog, setConfirmDialog } = props;

    return (
        <Dialog classes={{ paper: styles.dialog }} open={confirmDialog.isOpen}>
            <DialogTitle className={styles.dialogTitle}>
                <IconButton className={styles.titleIcon} disableRipple>
                    <NotListedLocationOutlinedIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={styles.dialogContent}>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className={styles.dialogAction}>
                <FormButton
                    text="No"
                    color="primary"
                    variant="outlined"
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                />
                <FormButton
                    text="Yes"
                    color="secondary"
                    variant="outlined"
                    onClick={confirmDialog.onConfirm}
                />
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;