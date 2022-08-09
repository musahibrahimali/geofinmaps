import { makeStyles } from "@mui/styles";

export const PopUpStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: "absolute",
        top: theme.spacing(5),
    },
    titleContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center"
    }
}));