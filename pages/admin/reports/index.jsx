import React from 'react';
import { ReportContent, Header, ShimmerPage } from "../../../components/components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { closeDrawer, openDrawer } from '../../../provider/provider';
import { useQuery } from '@tanstack/react-query';

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

const Reports = (props) => {
    const {
        reportsUrl,
        cookie,
        profileUrl,
        logOutUrl,
    } = props;
    const drawer = useSelector((state) => state.drawer.isDrawerOpen);
    // create an instance of dispatch to pass to the footer
    const dispatch = useDispatch();

    // fetch reports data
    const { data, isLoading } = useQuery(
        ["reports_data", reportsUrl],
        () => fetchReportsData(reportsUrl),
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
                    <ReportContent reports={data?.data} />
            }
        </React.Fragment>
    );
}

// get serverside props (this returns the api key)
export const getServerSideProps = async ({ req }) => {
    const reportsUrl = process.env.ALLREPORTSURL;
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
            reportsUrl: reportsUrl,
            profileUrl: profileUrl,
            logOutUrl: logOutUrl,
        }
    }
}

export default Reports;