import React from 'react';
import Image from 'next/image';
import { Header } from "../../../components/components";
import axios from "axios";
import { userIcon } from "../../../assets/assets";
import { useSelector, useDispatch } from "react-redux";
import { closeDrawer, openDrawer } from '../../../provider/provider';
import { useQuery } from '@tanstack/react-query';
import {ShimmerPage} from "../../../components/components";

const fetchUserData = async (userUrl, id) => {
    return axios({
        url: `${userUrl}${id}`,
        method: "GET",
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}

const Operator = (props) => {
    const { id, userUrl } = props;
    const drawer = useSelector((state) => state.drawer.isDrawerOpen);
    // create an instance of dispatch to pass to the footer
    const dispatch = useDispatch();

    // fetch reports data
    const { data, isLoading } = useQuery(
        ["report_data", { userUrl, id }],
        () => fetchUserData(userUrl, id),
        {
            keepPreviousData: true,
            enabled: true,
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
            {
                isLoading?
                    <ShimmerPage /> :
                    <div>
                        <Header handleOpenDrawer={handleOpenDrawer} />
                        <div className="px-8 py-24">
                            <div className="md:grid grid-cols-4 grid-rows-2  bg-white dark:bg-gray-900 gap-2">
                                <div className="bg-white dark:bg-gray-900 md:col-span-1 h-48 shadow-md">
                                    <div className="bg-white dark:bg-gray-900 flex w-full h-full relative justify-center object-cover" >
                                        <Image
                                            loading='lazy'
                                            src={userIcon}
                                            width={190}
                                            height={120}
                                            className="object-cover m-auto"
                                            alt="this is a demo image"
                                        />
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-gray-900 md:col-span-3 h-48 shadow-md p-4">
                                    <div className="bg-white dark:bg-gray-900 border border-solid border-gray-400 dark:border-gray-600 flex m-2">
                                        <span
                                            className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-200
                                        font-bold uppercase rounded-l px-4 py-2 bg-white dark:bg-gray-900
                                        shadow-sm w-2/6; whitespace-no-wrap">
                                            Name
                                        </span>
                                        <input
                                            className="px-4 border-l-2 w-full text-left bg-white dark:bg-gray-900 text-base
                                                    md:text-lg lg:text-xl text-gray-500 dark:text-gray-100
                                                    uppercase font-bold cursor-default border-gray-400
                                                    dark:border-gray-600 focus:outline-none  rounded-md
                                                    rounded-l-none shadow-sm -ml-1 w-4/6;"
                                            type="text"
                                            value={data?.data?.fullName}
                                            readOnly
                                        />
                                    </div>
                                    <div className="bg-white dark:bg-gray-900 flex m-2 border border-solid
                                                        border-gray-400 dark:border-gray-600">
                                        <span className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-200
                                                    font-bold uppercase rounded-l px-4 py-2 bg-white dark:bg-gray-900
                                                    shadow-sm w-2/6; whitespace-no-wrap">
                                            Email
                                        </span>
                                        <input
                                            className="px-4 w-full border-l-2 text-left bg-white dark:bg-gray-900 text-base
                                                          text-gray-500 dark:text-gray-100
                                                           font-bold cursor-default border-gray-400
                                                           dark:border-gray-600 focus:outline-none  rounded-md
                                                           rounded-l-none shadow-sm -ml-1 w-4/6;"
                                            type="text"
                                            value={data?.data?.email}
                                            readOnly
                                        />
                                    </div>
                                    <div className="bg-white dark:bg-gray-900 flex m-2 border border-solid border-gray-400 dark:border-gray-600" >
                                        <span className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-200
                                                    font-bold uppercase rounded-l px-4 py-2 bg-white dark:bg-gray-900
                                                     shadow-sm w-2/6; whitespace-no-wrap">
                                            Dept.
                                        </span>
                                        <input
                                            className="px-4 border-l-2 text-left bg-white dark:bg-gray-900 text-base
                                                           md:text-lg lg:text-xl text-gray-500 dark:text-gray-100
                                                           uppercase font-bold cursor-default border-gray-400
                                                           dark:border-gray-600 focus:outline-none  rounded-md
                                                           rounded-l-none shadow-sm -ml-1 w-4/6;"
                                            type="text"
                                            value={data?.data?.departmentId}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-gray-900 md:col-span-4 shadow-md p-4 mb-4">
                                    <h3 className="p-2 mt-4 mb-4 text-base text-center md:text-left md:text-lg
                                                        lg:text-xl text-gray-800 dark:text-gray-300 uppercase
                                                        font-extrabold tracking-wide md:tracking-wider
                                                        lg:tracking-widest cursor-default" >
                                        Profile Description
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300 text-justify font-normal text-base md:text-lg lg:text-xl">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad est libero modi
                                        non odio provident qui quod sed sit ullam. Accusantium animi dolorum
                                        error hic sequi ut, voluptas. Commodi, id.
                                    </p>
                                </div>

                            </div>

                        </div>
                    </div>
            }
        </React.Fragment>
    );
}

// get serverside props (this returns the api key)
export const getServerSideProps = async (context) => {
    const userUrl = process.env.PROFILE_URL_ID;
    const id = context.params.id;
    let user = false;
    const cookie = context.req.cookies['access_token'];
    if (cookie !== undefined) {
        user = true;
    }

    return {
        props: {
            cookie: user,
            userUrl: userUrl,
            id: id,
        }
    }
}

export default Operator;