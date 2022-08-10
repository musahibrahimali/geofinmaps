import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, Polyline } from 'react-google-maps';
import InfoWindow from "react-google-maps/lib/components/InfoWindow";
import {ConfirmDialog, Notification, PopUp, ReportForm} from "../../../../global/global";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import {PinIcon} from "../../../../../assets/assets";
const initialPosition = { lat: 6.673175, lng: -1.565423 };

const Map = (props) => {
    const { coordinates, cableData, addReportUrl } = props;
    const [position, setPosition] = useState(initialPosition);
    const [isLocation, setIsLocation] = useState(false);
    const user = useSelector((state) => state.user.user);

    const setUserPosition = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setPosition({
            lat: latitude,
            lng: longitude,
        });
        setIsLocation(!isLocation);
    }

    useEffect(() => {
        const getUserLocation = async () => {
            await navigator.geolocation.getCurrentPosition(setUserPosition);
        }
        getUserLocation().then(() => { });
    }, [isLocation]);


    return (
        <React.Fragment>
            <GoogleMap
                defaultZoom={16.0}
                defaultCenter={position}
                defaultOptions={{
                    mapTypeControlOptions: {
                        mapTypeIds: [
                            'roadmap', 'satellite'
                        ],
                    },
                }}>
                {
                    user ? coordinates?.map((item, index) => {
                        return (
                            <DefaultMarker
                                key={index}
                                item={item}
                                cableData={cableData[index]}
                                addReportUrl={addReportUrl}
                            />
                        );
                    }) : <div> </div>
                }
                <Polyline
                    path={coordinates?.sort((a,b) => {
                        return a? a.lng < b.lng : b;
                    })}
                    options={{
                        geodesic: true,
                        strokeColor: "#FF0000",
                        strokeOpacity: 1.0,
                        strokeWeight: 2,
                    }}
                />
            </GoogleMap>
        </React.Fragment>
    );
}

const DefaultMarker = (props) => {
    const { item, cableData, addReportUrl } = props;
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: "",
        subTitle: "",
    });
    const [markerOpen, setMarkerOpen] = useState(false);
    const [openPopUp, setOpenPopUp] = useState(false);
    const user = useSelector((state) => state.user.user);
    const router = useRouter();

    const onToggleOpen = () => {
        setMarkerOpen(!markerOpen);
    }

    // close pop up
    const handleOpenPopUP = () => {
        if (!user) {
            setConfirmDialog({
                isOpen: true,
                title: "No Active User",
                subTitle: "No user is currently logged in. log in to make a report",
                onConfirm: () => {
                    router.push('/auth').then(() => { });
                }
            })
        } else {
            setOpenPopUp(!openPopUp);
        }
    }

    return (
        <React.Fragment>
            <Marker
                label={{
                    text: "N",
                    color: "#FFFFFF",
                    fontWeight: "bold"
                }}
                position={{ lat: item.lat, lng: item.lng }}
                animation={google.maps.Animation.DROP}
                icon={PinIcon}
                onClick={onToggleOpen}>
                {
                    markerOpen &&
                        <InfoWindow onCloseClick={onToggleOpen}>
                            <div className="px-1 flex flex-col justify-between items-center w-auto bg-white dark:bg-gray-900 h-auto">
                                <div className="flex justify-between items-center border-b border-gray-400">
                                    <div className="flex mr-16 justify-center items-center">
                                        <p className="text-blue-600 dark:text-gray-100 cursor-pointer font-bold text-sm md:text-lg">
                                            Node Point
                                        </p>
                                    </div>
                                    <button
                                        className="bg-blue-500 px-8 py-2 mx-4 my-2 text-gray-100 dark:text-gray-100 font-bold tracking-wider md:text-lg"
                                        onClick={handleOpenPopUP}
                                    >
                                        report
                                    </button>
                                </div>
                                <div className="flex flex-col justify-between items-center py-4">
                                    <p className="text-lg md:text-xl text-blue-600 dark:text-gray-100 font-bold mb-2">
                                        {cableData.location}
                                    </p>
                                    <p className="text-gray-700 dark:text-gray-100 mb-2 mx-2">
                                        {cableData.details}
                                    </p>
                                    <div className="flex flex-col mt-2">
                                        <div className="flex flex-col justify-between items-start">
                                            <div className="flex flex-row justify-start items-start">
                                                <span className="font-bold text-teal-500 dark:text-gray-100 mx-2">
                                                    Latitude :
                                                </span>
                                                <p className="text-blue-600 dark:text-gray-100 font-bold">
                                                    {item.lat.toString()}
                                                </p>
                                            </div>
                                            <div className="flex flex-row justify-start items-start">
                                                <span className="font-bold text-teal-500 dark:text-gray-100 mx-2">
                                                    Longitude :
                                                </span>
                                                <p className="text-blue-600 dark:text-gray-100 font-bold">
                                                    {item.lng.toString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </InfoWindow>
                }
            </Marker>

            <PopUp
                openPopUp={openPopUp}
                setOpenPopUp={setOpenPopUp}
                title={"Form"}
                color="primary"
                iconColor="primary">
                <ReportForm
                    cableId={cableData._id}
                    coordinateId={cableData.coord[0]._id}
                    addReportUrl={addReportUrl}
                    handleOpenPopUp={handleOpenPopUP}
                />
            </PopUp>

            {/* Action Notification */}
            <Notification
                notify={notify}
                setNotify={setNotify}
            />

            {/* confirm dialog */}
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />

        </React.Fragment>

    );
}

export default Map;