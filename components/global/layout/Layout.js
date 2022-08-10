import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
    AppDrawer,
    Footer,
} from "../global";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    lightTheme,
    darkTheme,
    closeDrawer,
    openDrawer,
} from '../../../provider/provider';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create a client
const queryClient = new QueryClient()

const MainLayout = (props) => {
    /* props */
    const { children } = props;
    const theme = useSelector((state) => state.theme.theme);
    const user = useSelector((state) => state.user.user);
    const drawer = useSelector((state) => state.drawer.isDrawerOpen);
    // create an instance of dispatch to pass to the footer
    const dispatch = useDispatch();

    const appTheme = createTheme({
        palette: {
            mode: theme ? "dark" : "light", // toggle light and dark theme
            ...(!theme
                ? {
                    // palette values for light mode
                }
                : {
                    // palette values for dark mode
                    custom_paper: {
                        main: '#121212',
                    }
                }),
        },
    });

    /* switch between dark and light mode */
    const handleTheme = () => {
        if (theme) {
            dispatch(darkTheme(false));
        } else {
            dispatch(lightTheme(true));
        }
    }

    const handleOpenDrawer = () => {
        if (drawer) {
            dispatch(closeDrawer(false));
        } else {
            dispatch(openDrawer(true));
        }
    }

    return (
        <React.Fragment>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={appTheme}>
                    <div className={theme ? "dark" : ""}>
                        {
                            user?.isAdmin ?
                                /* user is an admin */
                                <div>
                                    {/*<div className={styles.root}>*/}
                                    {/*    <SideBar handleOpenDrawer={handleOpenDrawer} />*/}
                                    {/*</div>*/}

                                    <div className="bg-white dark:bg-gray-900">
                                        <div>
                                            <AppDrawer handleOpenDrawer={handleOpenDrawer} />
                                        </div>
                                        <div>
                                            {children}
                                        </div>

                                        {/*/!* footer for all pages *!/*/}
                                        <Footer />
                                    </div>
                                </div> :

                                /* user is not an admin */
                                <div>
                                    {/* body content of the app */}
                                    <div className="bg-white dark:bg-gray-900 h-full z-30">
                                        {/* side bar and its content goes in here */}
                                        <div>
                                            <AppDrawer handleOpenDrawer={handleOpenDrawer} />
                                        </div>

                                        {/* all pages content goes in here as children from props */}
                                        <div>
                                            {children}
                                        </div>
                                        {/*<BackToTop />*/}
                                    </div>

                                    {/* footer for all pages */}
                                    <div className="">
                                        <Footer handleTheme={handleTheme} />
                                    </div>
                                </div>
                        }
                    </div>
                </ThemeProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </React.Fragment>
    );
};

export default MainLayout;