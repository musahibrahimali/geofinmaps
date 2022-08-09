import React from 'react';
import Navbar from "./Navbar/Navbar";

const Header = (props) => {
    const {handleOpenDrawer, profileUrl, logOutUrl, cookie} = props;
    return (
        <React.Fragment>
            <Navbar
                handleOpenDrawer={handleOpenDrawer}
                profileUrl={profileUrl}
                logOutUrl={logOutUrl}
                cookie={cookie}
            />
        </React.Fragment>
    );
};

export default Header;