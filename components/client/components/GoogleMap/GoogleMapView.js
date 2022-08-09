import MapWrapper from "./Map/MapWrapper";

const GoogleMapView = (props) => {
    const { cableData, coordinates, mapApiKey } = props;
    return (
        <div className="h-screen w-full z-40">
            <MapWrapper
                cableData={cableData}
                coordinates={coordinates}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${mapApiKey}`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    );
}

export default GoogleMapView;