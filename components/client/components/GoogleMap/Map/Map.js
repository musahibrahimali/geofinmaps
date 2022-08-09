import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, Polyline } from 'react-google-maps';
import InfoWindow from "react-google-maps/lib/components/InfoWindow";
import { ConfirmDialog, FormButton, Notification, PopUp, ReportForm } from "../../../../global/global";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
const initialPosition = { lat: 6.673175, lng: -1.565423 };

const Map = (props) => {
    const { coordinates, cableData } = props;
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
    }

    useEffect(() => {
        const getUserLocation = async () => {
            const position = navigator.geolocation.getCurrentPosition(setUserPosition);
            if (position) {
                setIsLocation(!isLocation);
            }
        }
        getUserLocation().then(() => { });
    }, [isLocation]);


    return (
        <>
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
                    user ? coordinates.map((item, index) => {
                        return (
                            <DefaultMarker key={index} item={item} cableData={cableData[index]} />
                        );
                    }) : <div> </div>
                }
                <Polyline
                    path={coordinates.sort((a,b) => {
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
        </>
    );
}

const DefaultMarker = (props) => {
    const { item, cableData } = props;
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
        <>
            <Marker
                label={{
                    text: "N",
                    color: "#FFFFFF",
                    fontWeight: "bold"
                }}
                position={{ lat: item.lat, lng: item.lng }}
                animation={google.maps.Animation.DROP}
                onClick={onToggleOpen}>
                {
                    markerOpen &&
                    <InfoWindow onCloseClick={onToggleOpen}>
                        <div className="px-1 flex flex-col justify-between items-center w-auto bg-white dark:bg-gray-800 h-auto">
                            <div className="flex justify-between items-center border-b border-gray-400">
                                <div className="flex mr-16 justify-center items-center">
                                    <p className="text-blue-600 cursor-pointer font-bold text-sm">Node Point</p>
                                </div>
                                <FormButton
                                    size="small"
                                    text="report"
                                    onClick={handleOpenPopUP}
                                />
                            </div>
                            <div className="flex flex-col justify-between items-center py-2">
                                <p className="text-lg text-blue-600 font-bold">
                                    {cableData.location}
                                </p>
                                <p className="text-gray-700 dark:text-gray-100">
                                    some descriptions
                                </p>
                                <div className="flex flex-col mt-2">
                                    <div className="flex flex-col justify-between items-center">
                                        <p className="text-blue-600 dark:text-gray-100 font-bold">
                                            {item.lat.toString()}
                                        </p>
                                        <p className="text-blue-600 dark:text-gray-100 font-bold">
                                            {item.lng.toString()}
                                        </p>
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
                title={"Id Form"}
                color="secondary"
                iconColor="primary">
                <ReportForm
                    lat={item.lat}
                    lng={item.lng}
                    handleOpenPopUp={handleOpenPopUP}
                    recordForEdit={null}
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

        </>

    );
}

export default Map;