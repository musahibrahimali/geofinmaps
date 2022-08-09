import React, {useEffect, useState} from "react";
import clsx from 'clsx';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Badge,
    MenuItem,
    Menu,
} from "@mui/material";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { NavbarStyles } from "./NavbarStyles";
import { useRouter } from "next/router";
import { Notification } from "../../../widgets/FormControls/controls";
import {useDispatch, useSelector} from "react-redux";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {setUser} from "../../../../../provider/reducers/userReducer";

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

const menuId = 'primary-search-account-menu';
const Navbar = (props) => {
    const { handleOpenDrawer, profileUrl, logOutUrl, cookie } = props;
    const styles = NavbarStyles();
    const sidebar = useSelector((state) => state.sidebar.sidebar);
    const router = useRouter();
    const user = useSelector((state) => state.user.user);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [signIn, setSignIn] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });

    // create an instance of dispatch to pass to the footer
    const dispatch = useDispatch();

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    // fetch the cable data with useQuery
    const { data } = useQuery(
        ["admin_data", profileUrl],
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
        router.push('/admin/auth').then(() => { });
    }

    const handleAdminSignInClick = () => {
        handleMenuClose();
        router.push('/admin').then(() => { });
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

    const handleSignOut = async () => {
        const _logout = await axios({
            url: logOutUrl,
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
            router.replace('/admin/auth').then(() => { });
        }
    };

    useEffect(() => {
        if(data){
            dispatch(setUser(data?.data));
        }
    }, [data?.data]);

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}>
            {user ? <MenuItem onClick={handleMenuClose}>Profile</MenuItem> : <div> </div>}
            {user ? <MenuItem onClick={handleSignOut}>Sign Out</MenuItem> : <div> </div>}
            {user ? <div> </div> : <MenuItem onClick={handleSignInClick}>Sign In</MenuItem>}
            {user ? <div> </div> : <MenuItem onClick={handleAdminSignInClick}>Field Operator</MenuItem>}
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
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <NotificationsOutlinedIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <MailOutlineOutlinedIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
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
            <AppBar
                position="fixed"
                className={clsx(styles.appBar, {
                    [styles.appBarShift]: sidebar,
                })}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleOpenDrawer}
                        edge="start"
                        className={clsx(styles.menuButton, {
                            [styles.hide]: sidebar,
                        })}>
                        <MenuOutlinedIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        GeofinMaps
                    </Typography>

                    <div className={styles.grow} />

                    <div>
                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={0} color="secondary">
                                <NotificationsOutlinedIcon />
                            </Badge>
                        </IconButton>
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={0} color="secondary">
                                <MailOutlineOutlinedIcon />
                            </Badge>
                        </IconButton>
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

                </Toolbar>
            </AppBar>
            {renderMenu}
            {renderMobileMenu}

            {/* Action Notification */}
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </React.Fragment>
    );
};

export default Navbar;