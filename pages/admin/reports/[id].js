import React from 'react';
import { Header, ShimmerPage } from "../../../components/components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { closeDrawer, openDrawer } from '../../../provider/provider';
import { useQuery } from '@tanstack/react-query';

// fetch reports data
const fetchReportData = async (reportUrl, id) => {
    return axios({
        url: `${reportUrl}${id}`,
        method: "GET",
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}

const Report = (props) => {
    const { id, reportUrl, } = props;

    // fetch reports data
    const { data, isLoading } = useQuery(
        ["report_data", { reportUrl, id }],
        () => fetchReportData(reportUrl, id),
        {
            keepPreviousData: true,
            enabled: true,
        }
    );

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
            {
                isLoading ?
                    <ShimmerPage /> :
                    <div>
                        <Header handleOpenDrawer={handleOpenDrawer} />
                        <div className="pt-20 pb-52 bg-white dark:bg-gray-900 px-8">
                            <div className="flex flex-col justify-between items-center">
                                <h1 className="text-xl font-bold uppercase md:text-4xl text-center text-blue-600">
                                    {data?.data?.title}
                                </h1>
                                <div className="flex justify-center items-center pt-4 pb-2">
                                    <h3 className="text-blue-600 uppercase mx-2 font-bold">
                                        {data.data?.location}
                                    </h3>
                                    <h3 className="text-center text-gray-900 dark:text-gray-200 font-bold uppercase tracking-tighter" >
                                        {data?.data?.reportType}
                                    </h3>
                                </div>
                                <p className="text-gray-700 dark:text-gray-200 font-bold uppercase text-lg md:text-xl">
                                    {data.data?.author[0].fullName}
                                </p>
                                <p className="text-gray-700 py-4 dark:text-gray-200 text-lg md:text-xl text-justify">
                                    {data?.data?.description}
                                </p>
                            </div>
                        </div>
                    </div>
            }
        </React.Fragment>
    );
}

// get serverside props (this returns the api key)
export const getServerSideProps = async (context) => {
    const reportUrl = process.env.GET_REPORT_URL;
    const id = context.params.id;
    let user = false;
    const cookie = context.req.cookies['access_token'];
    if (cookie !== undefined) {
        user = true;
    }

    return {
        props: {
            id: id,
            cookie: user,
            reportUrl: reportUrl,
        }
    }
}


export default Report;