import React from 'react';
import MapWrapper from "./Map/MapWrapper";

const GoogleMapView = (props) => {
    const { cableData, coordinates, mapApiKey, addReportUrl } = props;
    return (
        <React.Fragment>
            <div className="h-screen w-full z-40">
                <MapWrapper
                    cableData={cableData}
                    coordinates={coordinates}
                    addReportUrl={addReportUrl}
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${mapApiKey}`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        </React.Fragment>
    );
}

export default GoogleMapView;