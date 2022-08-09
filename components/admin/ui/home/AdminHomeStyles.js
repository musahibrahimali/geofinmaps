import {makeStyles} from "@mui/styles";

export const AdminHomeStyles = makeStyles(theme => ({
        employeePageContent: {
            margin: theme.spacing(5),
            marginTop: theme.spacing(5),
            marginRight: theme.spacing(5),
            marginLeft: theme.spacing(5),
            marginBottom: theme.spacing(0),
            padding: theme.spacing(3),
        },
        searchInput: {
            width: '75%',
        },
        newButton : {
            position: "absolute",
            right: "10px",
        }
    })
);