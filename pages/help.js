import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { ClientNavbar } from "../components/components";
import { closeDrawer, openDrawer } from '../provider/provider';

const Help = (props) => {
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
            <div className="bg-white dark:bg-gray-900 flex flex-col justify-between place-items-center">
                <h1 className="text-gray-700 dark:text-gray-200 uppercase text-extrabold my-4 text-xl md:text-4xl lg:text-6xl">
                    Help
                </h1>
                <div className="bg-white dark:bg-gray-900">
                    <p className="text-gray-700 dark:text-gray-200 text-justify text-base md:text-lg lg:text-xl">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat reiciendis ea, harum possimus voluptatibus voluptate consequuntur blanditiis nobis. Debitis officiis quo incidunt repellendus eos dolorum doloribus placeat dolor magni odit.
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat reiciendis ea, harum possimus voluptatibus voluptate consequuntur blanditiis nobis. Debitis officiis quo incidunt repellendus eos dolorum doloribus placeat dolor magni odit.
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat reiciendis ea, harum possimus voluptatibus voluptate consequuntur blanditiis nobis. Debitis officiis quo incidunt repellendus eos dolorum doloribus placeat dolor magni odit.
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat reiciendis ea, harum possimus voluptatibus voluptate consequuntur blanditiis nobis. Debitis officiis quo incidunt repellendus eos dolorum doloribus placeat dolor magni odit.
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat reiciendis ea, harum possimus voluptatibus voluptate consequuntur blanditiis nobis. Debitis officiis quo incidunt repellendus eos dolorum doloribus placeat dolor magni odit.
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat reiciendis ea, harum possimus voluptatibus voluptate consequuntur blanditiis nobis. Debitis officiis quo incidunt repellendus eos dolorum doloribus placeat dolor magni odit.
                    </p>
                </div>
            </div>
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

export default Help;