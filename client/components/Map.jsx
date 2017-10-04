import React from 'react';
import GoogleMapsLoader from 'google-maps';
import KEY from '../../config.js';
import mapStyles from '../mapStyles.js';
import sampleData from '../sampleData.js';
import $ from 'jquery';
import actions from '../sendLocation.js';

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
    this.markers = null;
  }

  componentDidMount() {
    GoogleMapsLoader.KEY = KEY.KEY;
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
      searchBox.addListener('places_changed', () => {
        this.search(searchBox.getPlaces(), google, map);
      });
      var results = actions.get(google, map)
      .then((results) => {
        console.log('Results:', results);
        this.markers = results.markers;
      });
    });
  }

  search(places, google, map) {
    var bounds = new google.maps.LatLngBounds();
    var searchLat;
    var searchLng;
    places.forEach(place => {
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
        searchLat = place.geometry.location.lat();
        searchLng = place.geometry.location.lng();
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);

    actions.removeMarkers(this.markers);
    actions.post(searchLat, searchLng, google, map)
    .then((results) => {
      console.log('POST request results:', results);
      this.markers = results.markers;
    });
    // var markers = results.markers;
    // var events = results.events;
  }

  render() {
    return (
      <div id="container">
        <div id="map"></div>
      </div>
    )
  }

}

export default Map;
