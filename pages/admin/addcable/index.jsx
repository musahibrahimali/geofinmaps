import React, { useState } from 'react';
import Link from 'next/link';
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { closeDrawer, openDrawer } from '../../../provider/provider';
import {
    Header,
    CopyRight,
    Form,
    FormButton,
    InputField,
    Notification,
    UseForm
} from "../../../components/components";
import axios from "axios";


const initialValues = {
    id: 0,
    location: '',
    longitude: '',
    latitude: '',
    details: '',
};

const postData = async (url, data) => {
    return axios({
        url: url,
        method: "POST",
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        data: data
    });
}


const AddCable = (props) => {
    const {
        addCableUrl,
        cookie,
        profileUrl,
        logOutUrl,
    } = props;
    /* data layer */
    const drawer = useSelector((state) => state.drawer.isDrawerOpen);
    // create an instance of dispatch to pass to the footer
    const dispatch = useDispatch();
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });

    const validateForm = (fieldValues = values) => {
        let temp = { ...errors };
        if ('location' in fieldValues) {
            temp.location = fieldValues.location ? "" : "This Field is Required";
        }
        if ('details' in fieldValues) {
            temp.details = fieldValues.details ? "" : "This Field is Required";
        }
        setErrors({
            ...temp
        });

        if (fieldValues === values) {
            return Object.values(temp).every(x => x === "");
        }
    }

    const handleAddData = async () => {
        const data = {
            location: values.location,
            coord: {
                lat: values.longitude,
                lng: values.latitude,
            },
            city: values.location,
            details: values.details,
        }
        const results = await postData(addCableUrl, data)
        if(results.status === 200 || results.data?.data !== undefined || true){
            setNotify({
                isOpen: true,
                message: "Data Added successfully",
                type: "success"
            });
        }else{
            setNotify({
                isOpen: true,
                message: "There was an error saving data",
                type: "error"
            });
        }
        handleResetForm();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            await handleAddData();
        }
    }

    const handleOpenDrawer = () => {
        if (drawer) {
            dispatch(closeDrawer(false));
        } else {
            dispatch(openDrawer(true));
        }
    }

    const {
        values,
        setErrors,
        handleInputChange,
        handleResetForm,
        errors,
    } = UseForm(initialValues, true, validateForm);

    return (
        <React.Fragment>
            <Header
                handleOpenDrawer={handleOpenDrawer}
                profileUrl={profileUrl}
                logOutUrl={logOutUrl}
                cookie={cookie}
            />
            <div className="pt-20 mx-12 pb-8">
                <div className="h-full shadow-md border border-gray-200 dark:border-gray-600
                        mb-4 rounded-xl bg-white dark:bg-gray-900 overflow-hidden mt-6 grid gap-0 grid-cols-8 grid-rows-1" >
                    <div className="col-span-4 h-full w-full bg-cable bg-no-repeat bg-center bg-cover flex justify-center items-center">

                    </div>
                    <div className="col-span-4 h-full overflow-auto flex justify-center items-center mx-0 border-l border-gray-200 dark:border-gray-600">
                        <div className="w-full h-full p-6 bg-white dark:bg-gray-900">
                            <h1 className="text-xl mb-8 md:text-2xl lg:text-4xl font-bold leading-tight mt-4 text-gray-700 dark:text-gray-200 text-center md:text-left">
                                Add Cable Laying
                            </h1>

                            <Form onSubmit={handleSubmit}>
                                <InputField
                                    required
                                    label="City / Town"
                                    name="location"
                                    type="text"
                                    value={values.location}
                                    onChange={handleInputChange}
                                    error={errors.location}
                                />

                                <InputField
                                    required
                                    label="Latitude"
                                    name="latitude"
                                    type="text"
                                    value={values.latitude}
                                    onChange={handleInputChange}
                                    error={errors.latitude}
                                />

                                <InputField
                                    required
                                    label="Longitude"
                                    name="longitude"
                                    type="text"
                                    value={values.longitude}
                                    onChange={handleInputChange}
                                    error={errors.longitude}
                                />

                                <InputField
                                    required
                                    multiline={true}
                                    rows={6}
                                    maxRow={20}
                                    label="Cable Details"
                                    name="details"
                                    type="text"
                                    value={values.details}
                                    onChange={handleInputChange}
                                    error={errors.details}
                                />

                                <div className="mb-4 w-full flex justify-center items-center">
                                    <FormButton
                                        className="w-full"
                                        type="submit"
                                        text="save data"
                                        variant="outlined"
                                        color="primary"
                                    />
                                </div>
                            </Form>

                            <hr className="my-6 border-gray-300 dark:border-gray-600 w-full" />

                            <button
                                className="w-full block bg-white hover:bg-gray-500 dark:bg-transparent dark:hover:bg-gray-200 dark:text-gray-100 dark:hover:text-gray-900 focus:bg-gray-100 text-gray-700 hover:text-gray-100 font-semibold rounded-lg px-4 py-3 border border-gray-300 dark:border-gray-400" >
                                <div className="flex items-center justify-center">
                                    <Link href='/admin/addcable/loadfile'>
                                        <a>
                                            <span className="ml-4">
                                                Load a JSON File
                                            </span>
                                        </a>
                                    </Link>
                                </div>
                            </button>
                            <Box mt={4}>
                                <CopyRight />
                            </Box>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Notification */}
            <Notification
                notify={notify}
                setNotify={setNotify}
            />

        </React.Fragment>
    );
}

// get serverside props (this returns the api key)
export const getServerSideProps = async ({ req }) => {
    const addCableUrl = process.env.ADD_CABLE_URL;
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
            addCableUrl: addCableUrl,
            profileUrl: profileUrl,
            logOutUrl: logOutUrl,
        }
    }
}

export default AddCable;