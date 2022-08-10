import React from 'react';
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { PopUpStyles } from "./PopUpStyles";
import { ActionButton } from "../controls";

const PopUp = (props) => {

    const styles = PopUpStyles();

    const { title, children, openPopUp, setOpenPopUp, color, iconColor } = props;

    const handleClosePopUp = () => {
        setOpenPopUp(false);
    }

    return (
        <Dialog maxWidth="md" open={openPopUp} classes={{ paper: styles.dialogWrapper }}>
            <DialogTitle>
                <div className={styles.titleContainer}>
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>
                    <ActionButton
                        color={color || "secondary"}
                        onClick={handleClosePopUp}
                    >
                        <CloseOutlinedIcon className="text-white" color={iconColor || "secondary"} />
                    </ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    );
}

export default PopUp;
