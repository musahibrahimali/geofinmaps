import React, { useState } from 'react';
import Image from 'next/image';
import { UploadImage } from '../../../assets/assets';
import { Notification, Header } from "../../../components/components";
import { closeDrawer, openDrawer } from '../../../provider/provider';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

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

const LoadFile = (props) => {
    const {
        cookie,
        addCableUrl,
        profileUrl,
        logOutUrl,
    } = props;
    /* data layer */
    const drawer = useSelector((state) => state.drawer.isDrawerOpen);
    // create an instance of dispatch to pass to the footer
    const dispatch = useDispatch();

    const [file, setFile] = useState({});
    const [fileContent, setFileContent] = useState(null);

    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });

    const handleOnChange = (event) => {
        let selectedFile = event.target.files[0];
        const reader = new FileReader();
        if (selectedFile.type === 'application/json') {
            reader.readAsText(selectedFile);
            reader.onload = () => {
                const data = JSON.parse(reader.result);
                setFile(selectedFile);
                setFileContent(data);
            }
            reader.onerror = () => {
                setNotify({
                    isOpen: true,
                    message: "There was an error reading file",
                    type: "error"
                });
            }
        } else {
            setNotify({
                isOpen: true,
                message: "The selected file is not supported",
                type: "error"
            });
        }
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (!file) {
            setNotify({
                isOpen: true,
                message: "No file selected",
                type: "error"
            });
        } else {
            fileContent.map(async (item) => {
                const data = {
                    city: item.location,
                    details: item.details,
                    coord: {
                        lat: item.coord.lat,
                        lng: item.coord.lng,
                    },
                    location: item.location,
                };
                const results = await postData(addCableUrl, data);
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
            });
        }
    }

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
            <div className="mx-24 pb-8 pt-20">
                <div className=" flex justify-center items-center">
                    <div className="sm:max-w-lg w-full p-10 bg-white dark:bg-gray-900 shadow-md rounded-xl border border-solid border-gray-200 dark:border-gray-600">
                        <div className="text-center">
                            <h2 className="mt-5 text-3xl font-bold uppercase text-gray-800 dark:text-gray-200">
                                File Upload
                            </h2>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                                select a JSON file type containing data for upload
                            </p>
                        </div>
                        <form className="mt-8 space-y-3" onSubmit={handleOnSubmit}>
                            <div className="grid grid-cols-1 space-y-2">
                                <label className="text-lg uppercase font-bold text-gray-700 dark:text-gray-300 tracking-wide">
                                    Load JSON File
                                </label>
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col rounded-lg border-4 border-dashed w-full border-gray-200 dark:border-gray-500 h-60 p-10 group text-center">
                                        <div className="h-full w-full text-center flex flex-col items-center justify-center">
                                            <div className="flex flex-auto max-h-48 mx-auto p-6">
                                                <Image
                                                    src={UploadImage}
                                                    alt="upload image"
                                                />
                                            </div>
                                            <p className="pointer-none text-gray-500 dark:text-gray-300">
                                                <span
                                                    className="text-blue-600 cursor-pointer hover:underline">
                                                    select a file
                                                </span>
                                                {" "}
                                                from your computer
                                            </p>
                                        </div>
                                        <input type="file" name="file" onChange={handleOnChange} />
                                    </label>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between items-center">
                                <p className="text-sm text-gray-500 dark:text-gray-300">
                                    <span>File type : json (example {"sample.json"})</span>
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-300">
                                    Selected File: {file.name ? file.name : "No file"}
                                </p>
                            </div>
                            <div>
                                <button type="submit"
                                    className="my-5 w-full border md:border border-gray-200 flex justify-center bg-gray-900 border-opacity-0 hover:border-opacity-0 dark:bg-gray-100 dark:text-gray-900 text-gray-100 p-4  rounded-full tracking-wide font-bold  focus:outline-none focus:shadow-outline hover:bg-gray-700 hover:text-gray-200 dark:hover:bg-transparent dark:hover:border-gray-400 dark:hover:text-gray-300 shadow-md cursor-pointer transition ease-in duration-300 uppercase text-base md:text:lg lg:text-xl"
                                >
                                    Upload
                                </button>
                            </div>
                        </form>
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

export default LoadFile;