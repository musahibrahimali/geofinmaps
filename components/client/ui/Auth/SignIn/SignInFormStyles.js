import { makeStyles } from "@mui/styles";

export const SignInFormStyles = makeStyles((theme) => ({
    root: {
        boxShadow: "none",
        borderRadius: "0",
    },
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        width: "100px",
        height: "100px",
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
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
            theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[800],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
}));