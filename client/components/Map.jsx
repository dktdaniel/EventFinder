const React = require('react');
const GoogleMapsLoader = require('google-maps');
const KEY = require('../../config.js').KEY;
const mapStyles = require('../mapStyles.js');
const sampleData = require('../sampleData.js');
const $ = require('jquery');

const eventTypes = {
  'Music': 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  'Arts & Theatre': 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
  'Film': 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
  'Sports': 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
  'Miscellaneous': 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
  'Undefined': 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
}

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

      $.ajax('http://localhost:3000').done(data => {
        console.log('DATA:', data);
        data.forEach(event => {
          var lat = Number(event.venue.lat);
          var lng = Number(event.venue.lng);

          markers.push(new google.maps.Marker({
            map: map,
            icon: eventTypes[event.event.category],
            position: new google.maps.LatLng(lat, lng)
          }));
        });
      });

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