import { makeStyles } from "@mui/styles";

export const SignUpFormStyles = makeStyles((theme) => ({
    root: {
        boxShadow: "none",
        borderRadius: "0",
    },
    mainContainer: {
        display: "flex",
        justifyContent: "center",
        padding: theme.spacing(1),
    },
    paper: {
        marginTop: theme.spacing(1),
        marginBottom: -theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        width: "100px",
        height: "100px",
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        padding: theme.spacing(1),
    },
    image: {
        height: "100vh",
        width: "100vw",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'center',
        backgroundImage: `url(https://source.unsplash.com/random)`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[800],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // marginLeft: -theme.spacing(2),
        // marginRight: -theme.spacing(2),
    },
    space: {
        paddingRight: "15px",
        paddingLeft: "15px",
    }
}));