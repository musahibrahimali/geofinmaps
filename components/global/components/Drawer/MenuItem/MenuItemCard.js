import React from 'react';
import Link from 'next/link';
import {Divider, ListItem, ListItemIcon, ListItemText} from "@mui/material";

const MenuItemCard = (props) => {
    const {text, icon, url} = props;
    return (
        <Link href={url}>
            <a>
                <ListItem button>
                    <ListItemIcon>
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
                <Divider />
            </a>
        </Link>
    );
};

export default MenuItemCard;