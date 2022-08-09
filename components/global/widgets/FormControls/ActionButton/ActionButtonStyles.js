import { makeStyles } from "@mui/styles";

export const ActionButtonStyles = makeStyles(theme => ({
    root: {
        minWidth: 0,
        margin: theme.spacing(0.5)
    },
    secondary: {
        backgroundColor: `${theme.palette.type === "light" ? theme.palette.primary.dark : theme.palette.secondary.dark}`, // theme.palette.secondary.light,
        "& .MuiButton-label": {
            color: `${theme.palette.type === "light" ? theme.palette.common.black : theme.palette.common.white}`,
        },
    },
    primary: {
        backgroundColor: `${theme.palette.type === "light" ? theme.palette.error.dark : theme.palette.error.dark}`,
        "& .MuiButton-label": {
            color: `${theme.palette.type === "light" ? theme.palette.common.black : theme.palette.common.white}`,
        },
    }
}));