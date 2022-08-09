import React from 'react';
import clsx from 'clsx';
import {
    Drawer,
    List,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { useSelector } from "react-redux";
import { SideBarStyles } from "./SideBarStyles";
import { useTheme } from "@mui/material";


const SideBar = (props) => {
    const theme = useTheme();
    const styles = SideBarStyles();
    const { handleOpenDrawer } = props;
    const sidebar = useSelector((state) => state.sidebar.sidebar);

    return (
        <Drawer
            variant="permanent"
            className={clsx(styles.drawer, {
                [styles.drawerOpen]: sidebar,
                [styles.drawerClose]: !sidebar,
            })}
            classes={{
                paper: clsx({
                    [styles.drawerOpen]: sidebar,
                    [styles.drawerClose]: !sidebar,
                }),
            }}
        >
            <div className={styles.toolbar}>
                <IconButton onClick={handleOpenDrawer}>
                    {theme.direction === 'rtl' ? <ChevronRightOutlinedIcon /> : <ChevronLeftOutlinedIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxOutlinedIcon /> : <MailOutlinedIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxOutlinedIcon /> : <MailOutlinedIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default SideBar;