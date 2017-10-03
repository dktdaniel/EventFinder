const React = require('react');
const GoogleMapsLoader = require('google-maps');
const KEY = require('../../config.js');
const mapStyles = require('../mapStyles.js');
const sampleData = require('../sampleData.js');

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
        zoom: 13,
        center: new google.maps.LatLng(37.774929, -122.419416),
        disableDefaultUI: false,
        styles: mapStyles
      });

      var input = document.getElementById('search-input');
      var searchBox = new google.maps.places.SearchBox(input);
      var markers = [];

      sampleData.forEach(event => {
        var lat = Number(event.venue.lat);
        var lng = Number(event.venue.lng);

        markers.push(new google.maps.Marker({
          map: map,
          position: new google.maps.LatLng(lat, lng)
        }));
      });

      searchBox.addListener('places_changed', () => {
        var places = searchBox.getPlaces();
        
        var bounds = new google.maps.LatLngBounds();

        places.forEach(place => {

          // Create icon based on search place
          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          // Create a new marker for each place
          markers.push(new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
          }));

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