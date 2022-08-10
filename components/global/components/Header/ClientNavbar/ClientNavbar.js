import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    MenuItem,
    Menu,
} from "@mui/material";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { ClientNavbarStyles } from "./ClientNavbarStyles";
import { useRouter } from "next/router";
import { Notification } from "../../../global";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {setUser} from "../../../../../provider/provider";

// fetch the user data with useQuery
const fetchData = async (profileUrl) => {
    return axios({
        url: profileUrl,
        method: "GET",
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}

const ClientNavbar = (props) => {
    const { handleOpenDrawer, profileUrl, cookie, logOutUrl } = props;
    const router = useRouter();
    const user = useSelector((state) => state.user.user);
    const styles = ClientNavbarStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [signIn, setSignIn] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });

    // create an instance of dispatch to pass to the footer
    const dispatch = useDispatch();

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    // fetch the cable data with useQuery
    const { data } = useQuery(
        ["user_data", profileUrl],
        () => fetchData(profileUrl),
        {
            keepPreviousData: true,
            enabled: !!cookie,
        }
    );

    // notify user of successful log in or log out
    const notifyUser = () => {
        if (signIn) {
            setNotify({
                isOpen: true,
                message: "Sign in Successful",
                type: "success"
            });
        } else {
            setNotify({
                isOpen: true,
                message: "Sign Out Successful",
                type: "success"
            });
        }

    }

    const handleSignInClick = () => {
        handleMenuClose();
        router.push('/auth').then(() => console.log("log in page"));
    }

    const handleAdminSignInClick = () => {
        handleMenuClose();
        router.push('/admin').then(() => console.log("admin page"));
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    /* functions */
    const handleSignOut = async () => {
        const _logout = await axios({
            url: `${logOutUrl}${user._id}`,
            method: "GET",
            withCredentials: true,
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
        if(_logout.status === 200 || _logout.data === true){
            setSignIn(false);
            notifyUser();
            handleMenuClose();
            router.replace('/auth').then(() => { });
        }
    }

    useEffect(() => {
        if(data){
            dispatch(setUser(data?.data));
        }else{
            // if(cookie){
            //     router.replace('/admin').then(() => console.log());
            // }
        }
    }, [data?.data]);

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {user ? <MenuItem onClick={handleMenuClose}>Profile</MenuItem> : <div> </div>}
            {user ? <MenuItem onClick={handleSignOut}>Sign Out</MenuItem> : <div> </div>}
            {user ? <div> </div> : <MenuItem onClick={handleSignInClick}>Sign In</MenuItem>}
            {user ? <div> </div> : <MenuItem onClick={handleAdminSignInClick}>Admin</MenuItem>}
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircleOutlinedIcon />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <React.Fragment>
            <div className={styles.grow}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={styles.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleOpenDrawer}>
                            <MenuOutlinedIcon />
                        </IconButton>
                        <Typography className={styles.title} variant="h6" noWrap>
                            <Link href="/">
                                <a>GeofinMaps</a>
                            </Link>
                        </Typography>
                        <div className={styles.grow} />
                        <div className={styles.sectionDesktop}>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit">
                                <AccountCircleOutlinedIcon />
                            </IconButton>
                        </div>
                        <div className={styles.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreVertOutlinedIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
            </div>

            {/* Action Notification */}
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </React.Fragment>
    );
};

export default ClientNavbar;