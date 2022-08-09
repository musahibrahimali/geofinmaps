import { makeStyles } from "@mui/styles";

export const ConfirmDialogStyles = makeStyles(theme => ({
    dialog: {
        position: "absolute",
        top: theme.spacing(5),
        padding: theme.spacing(2),
    },
    dialogContent: {
        textAlign: "center",
    },
    dialogTitle: {
        textAlign: "center",
        cursor: "default",
    },
    dialogAction: {
        justifyContent: "center",
    },
    titleIcon: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.main,
        "&:hover": {
            backgroundColor: theme.palette.secondary.light,
            color: "default"
        },
        "& .MuiSvgIcon-root": {
            fontSize: "8rem",
        },
    },
}));