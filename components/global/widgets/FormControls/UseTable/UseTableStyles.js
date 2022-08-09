import { makeStyles } from "@mui/styles";

export const UseTableStyles = makeStyles(theme => ({
    table: {
        marginTop: theme.spacing(3),
        '& thead th': {
            fontWeight: '600',
            color:
                theme.palette.type === 'light' ? theme.palette.common.white : theme.palette.grey[800],
            // color: theme.palette.common.white,
            backgroundColor: "#2196f3",
        },
        '& thead th:hover': {
            color: "#f5f5f5",
        },
        '& tbody td': {
            fontWeight: '300',
        },
        '& tbody tr:hover': {
            backgroundColor:
                theme.palette.type === 'light' ? "#fffbf2" : "#bdbdbd",
            // backgroundColor: theme.mode.dark ? "#2d2d2d" : "#fffbf2",
            cursor: 'pointer',
        },
    },
})
);