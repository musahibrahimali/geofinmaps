import React, {useEffect} from 'react';
import { AdminHome, Header } from '../../components/components';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { closeDrawer, openDrawer } from '../../provider/provider';
import { useQuery } from '@tanstack/react-query';
import {useRouter} from "next/router";

// fetch users data
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

// fetch reports data
const fetchReportsData = async (reportsUrl) => {
    return axios({
        url: reportsUrl,
        method: "GET",
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}


const AdminIndex = (props) => {
    const {
        usersUrl,
        reportsUrl,
        profileUrl,
        logOutUrl,
        deleteUserUrl,
        deleteReportUrl,
        cookie,
    } = props;
    const drawer = useSelector((state) => state.drawer.isDrawerOpen);
    // create an instance of dispatch to pass to the footer
    const dispatch = useDispatch();
    const router = useRouter();
    const handleOpenDrawer = () => {
        if (drawer) {
            dispatch(closeDrawer(false));
        } else {
            dispatch(openDrawer(true));
        }
    }

    // fetch users data
    const usersQuery = useQuery(
        ["users_data", usersUrl],
        () => fetchUsersData(usersUrl),
        {
            keepPreviousData: true,
            enabled: !!cookie,
        }
    );

    // fetch reports data
    const reportsQuery = useQuery(
        ["reports_data", reportsUrl],
        () => fetchReportsData(reportsUrl),
        {
            keepPreviousData: true,
            enabled: !!cookie,
        }
    );

    useEffect(() => {
        router.replace('/admin/auth').then(() => console.log());
    }, []);

    return (
        <React.Fragment>
            <Header
                handleOpenDrawer={handleOpenDrawer}
                profileUrl={profileUrl}
                logOutUrl={logOutUrl}
                cookie={cookie}
            />
            <AdminHome
                users={usersQuery.data?.data}
                reports={reportsQuery.data?.data}
                deleteUserUrl={deleteUserUrl}
                deleteReportUrl={deleteReportUrl}
            />
        </React.Fragment>
    );
};


// get serverside props (this returns the api key)
export const getServerSideProps = async ({ req }) => {
    const usersUrl = process.env.ALLUSERSURL;
    const reportsUrl = process.env.ALLREPORTSURL;
    const profileUrl = process.env.ADMIN_PROFILE_URL;
    const logOutUrl = process.env.LOGOUT_ADMIN_URL;
    const deleteUserUrl = process.env.DELETE_USER_URL;
    const deleteReportUrl = process.env.DELETE_REPORT_URL;
    let user = false;
    const cookie = req.cookies['access_token'];
    if (cookie !== undefined) {
        user = true;
    }

    return {
        props: {
            cookie: user,
            usersUrl: usersUrl,
            reportsUrl: reportsUrl,
            profileUrl: profileUrl,
            logOutUrl: logOutUrl,
            deleteUserUrl:deleteUserUrl,
            deleteReportUrl:deleteReportUrl,
        }
    }
}

export default AdminIndex;