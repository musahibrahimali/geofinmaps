import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { ClientNavbar } from "../components/components";
import { closeDrawer, openDrawer } from '../provider/provider';

const About = (props) => {
    const { cookie, profileUrl, logOutUrl } = props;
    const drawer = useSelector((state) => state.drawer.isDrawerOpen);
    // create an instance of dispatch to pass to the footer
    const dispatch = useDispatch();
    const handleOpenDrawer = () => {
        if (drawer) {
            dispatch(closeDrawer(false));
        } else {
            dispatch(openDrawer(true));
        }
    }

    return (
        <React.Fragment>
            <ClientNavbar
                profileUrl={profileUrl}
                logOutUrl={logOutUrl}
                cookie={cookie}
                handleOpenDrawer={handleOpenDrawer}
            />
        </React.Fragment>
    );
};

// get serverside props (this returns the api key)
export const getServerSideProps = async ({ req }) => {
    const profileUrl = process.env.PROFILEURL;
    const logOutUrl = process.env.LOGOUT_URL;
    let user = false;
    const cookie = req.cookies['access_token'];
    if (cookie !== undefined) {
        user = true;
    }

    return {
        props: {
            cookie: user,
            profileUrl: profileUrl,
            logOutUrl: logOutUrl,
        }
    }
}

export default About;