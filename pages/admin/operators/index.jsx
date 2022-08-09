import React from 'react';
import { UserContent, Header, ShimmerPage } from "../../../components/components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { closeDrawer, openDrawer } from '../../../provider/provider';
import { useQuery } from '@tanstack/react-query';

const fetchUsersData = async (usersUrl) => {
    return axios({
        url: usersUrl,
        method: "GET",
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}

const Operators = (props) => {
    const {
        usersUrl, cookie,
        profileUrl,
        logOutUrl,
    } = props;
    const drawer = useSelector((state) => state.drawer.isDrawerOpen);
    // create an instance of dispatch to pass to the footer
    const dispatch = useDispatch();

    // fetch users data
    const { data, isLoading } = useQuery(
        ["users_data", usersUrl],
        () => fetchUsersData(usersUrl),
        {
            keepPreviousData: true,
            enabled: !!cookie,
        }
    );

    const handleOpenDrawer = () => {
        if (drawer) {
            dispatch(closeDrawer(false));
        } else {
            dispatch(openDrawer(true));
        }
    }

    return (
        <React.Fragment>
            <Header
                handleOpenDrawer={handleOpenDrawer}
                profileUrl={profileUrl}
                logOutUrl={logOutUrl}
                cookie={cookie}
            />
            {
                isLoading ?
                    <ShimmerPage /> :
                    <UserContent users={data?.data} />
            }
        </React.Fragment>
    );
}

// get serverside props (this returns the api key)
export const getServerSideProps = async ({ req }) => {
    const usersUrl = process.env.ALLUSERSURL;
    const profileUrl = process.env.ADMIN_PROFILE_URL;
    const logOutUrl = process.env.LOGOUT_ADMIN_URL;
    let user = false;
    const cookie = req.cookies['access_token'];
    if (cookie !== undefined) {
        user = true;
    }

    return {
        props: {
            cookie: user,
            usersUrl: usersUrl,
            profileUrl: profileUrl,
            logOutUrl: logOutUrl,
        }
    }
}

export default Operators;