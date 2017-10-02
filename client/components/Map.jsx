const React = require('react');
const GoogleMapsLoader = require('google-maps');
const KEY = require('../../config.js');

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.map = null;
  }
  componentDidMount() {
    GoogleMapsLoader.KEY = KEY;
    GoogleMapsLoader.LIBRARIES = ['places'];

    GoogleMapsLoader.load(google => {
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: new google.maps.LatLng(37.774929, -122.419416),
        disableDefaultUI: false
      });

      var input = document.getElementById('search-input');
      var searchBox = new google.maps.places.SearchBox(input);

      searchBox.addListener('places_changed', () => {
        var places = searchBox.getPlaces();
        
        var bounds = new google.maps.LatLngBounds();

        places.forEach(place => {
          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });

        map.fitBounds(bounds);
      });

    });
  }

  render() {
  
    return (
      <div id="map"></div>
    )
  }
  
}

module.exports = Map;