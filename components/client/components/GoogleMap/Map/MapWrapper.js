import { withScriptjs, withGoogleMap } from 'react-google-maps';
import Map from './Map';

const MapWrapper = withScriptjs(withGoogleMap((props) => {
        const {cableData, coordinates, addReportUrl} = props;
        return (
            <Map
                addReportUrl={addReportUrl}
                cableData={cableData}
                coordinates={coordinates}
            />
        );
    }
));

export default MapWrapper;