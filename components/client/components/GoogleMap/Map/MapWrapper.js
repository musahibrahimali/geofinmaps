import { withScriptjs, withGoogleMap } from 'react-google-maps';
import Map from './Map';

const MapWrapper = withScriptjs(withGoogleMap((props) => {
    const {cableData, coordinates} = props;
    return (
        <Map cableData={cableData} coordinates={coordinates} />
    );
}
));

export default MapWrapper;