const Marty = require('marty');
const BaseComponent = require('./BaseComponent.jsx');
//const { TileLayer, Map, Marker, Popup } = require('react-leaflet');
const { GoogleMaps, Marker } = require('react-google-maps');
const { s17 } = require('../../test/support/sampleLocations');

class MapContainer extends BaseComponent {

    constructor(){
      super();
    }

  render(){
    const url = "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
    const attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      return (
        <GoogleMaps
          containerProps={{
            style: { height: '100%' }
          }}
          googleMapsApi={window.google.maps}
          zoom={15}
          center={this._positionify(s17)}
        >
          {this._markerify(s17)}
        </GoogleMaps>
      );
    }

  // (Location) -> Array[Number]
  _positionify(loc) {
    return { lat: loc.lat, lng: loc.lon };
  }

  _markerify(loc){
    return (
      <Marker
        position={this._positionify(loc)}
        key={loc.time}
      />
    );
  }

}

module.exports = Marty.createContainer(MapContainer);