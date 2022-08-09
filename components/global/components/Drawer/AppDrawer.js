import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { DrawerStyles } from "./DrawerStyles";
import MenuItemCard from "./MenuItem/MenuItemCard";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { SwipeableDrawer, Paper, List } from "@mui/material";
// import firebase from "firebase";
import { useRouter } from "next/router";


const AppDrawer = (props) => {
    const { handleOpenDrawer } = props;
    const user = useSelector((state) => state.user.user);
    const drawer = useSelector((state) => state.drawer.isDrawerOpen);
    // create an instance of dispach to pass to the footer
    const dispatch = useDispatch();
    const styles = DrawerStyles();
    const router = useRouter();

    return (
        <Paper classes={{ root: styles.root }}>
            <SwipeableDrawer
                anchor={"left"}
                open={drawer}
                onClose={handleOpenDrawer}
                onOpen={handleOpenDrawer}>
                <Paper
                    classes={{ root: styles.root }}
                    className={styles.list}
                    role="presentation"
                    onClick={handleOpenDrawer}
                    onKeyDown={handleOpenDrawer}>
                    <List>
                        {
                            user ?
                                <MenuItemCard
                                    text="Profile"
                                    url={"/admin"}
                                    icon={<PersonOutlineOutlinedIcon color="primary" />}
                                /> :
                                <div> </div>
                        }
                        {
                            user ?
                                <MenuItemCard
                                    text="Admin"
                                    url={"/admin"}
                                    icon={<PersonOutlineOutlinedIcon color="primary" />}
                                /> :
                                <div> </div>
                        }
                        {
                            !user ?
                                <MenuItemCard
                                    text="Field Operator"
                                    url={"/"}
                                    icon={<PersonOutlineOutlinedIcon color="primary" />}
                                /> :
                                <div> </div>
                        }
                        {
                            user ?
                                <MenuItemCard
                                    text="Operators"
                                    url={"/admin/operators"}
                                    icon={<PersonOutlineOutlinedIcon color="primary" />}
                                /> :
                                <div> </div>
                        }
                        {
                            user ?
                                <MenuItemCard
                                    text="Reports"
                                    url={"/admin/reports"}
                                    icon={<PersonOutlineOutlinedIcon color="primary" />}
                                /> :
                                <div> </div>
                        }
                        {
                            user ?
                                <MenuItemCard
                                    text="Add Cable Data"
                                    url={"/admin/addcable"}
                                    icon={<PersonOutlineOutlinedIcon color="primary" />}
                                /> :
                                <div> </div>
                        }
                        {
                            !user ?
                                <MenuItemCard
                                    text="Sign In"
                                    url={"/admin/signin"}
                                    icon={<LockOpenOutlinedIcon color="primary" />}
                                /> :
                                <div> </div>
                        }
                        {
                            user ?
                                <MenuItemCard
                                    onClick={() => {
                                        // firebase.auth().signOut().then(() => {
                                        //     router.replace('/admin/auth').then(() => {
                                        //     });
                                        // });
                                    }}
                                    text="Sign Out"
                                    url={"/admin"}
                                    icon={<ExitToAppOutlinedIcon color="primary" />}
                                /> :
                                <div> </div>
                        }
                    </List>
                </Paper>
            </SwipeableDrawer>
        </Paper>
    );
}

export default AppDrawer;

