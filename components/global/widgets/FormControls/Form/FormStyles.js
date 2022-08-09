import { makeStyles } from "@mui/styles";

export const FormStyles = makeStyles(theme => ({
    root: {
        "& .MuiFormControl-root": {
            width: "100%",
            margin: theme.spacing(1),
        }
    }
}));
