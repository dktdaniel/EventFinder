import React from 'react';
import GoogleMapsLoader from 'google-maps';
// import KEY from '../../config.js';
import mapStyles from '../utils/mapStyles.js';
import sampleData from '../utils/sampleData.js';
import $ from 'jquery';
import actions from '../utils/sendLocation.js';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.markers = null;
    this.state = {
      information: null
    }
  }

  componentDidMount() {
    var KEY = process.env.KEY;
    console.log('MAP COMPONENTDIDMOUNT', KEY);
    GoogleMapsLoader.KEY = KEY;
    GoogleMapsLoader.LIBRARIES = ['places'];

    GoogleMapsLoader.load(google => {
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: new google.maps.LatLng(37.791419, -122.413293),
        disableDefaultUI: false,
        styles: mapStyles
      });
      var currentLat = 37.791419;
      var currentLng = -122.413293;
      var input = document.getElementById('search-input');
      var searchBox = new google.maps.places.SearchBox(input);


      map.addListener('dragend', () => {
        console.log('i was dragged!');
        searchBox.setBounds(map.getBounds());
        var newLat = map.getBounds().getCenter().lat();
        var newLng = map.getBounds().getCenter().lng();
        currentLat = newLat;
        currentLng = newLng;
        var newLocation = { lat: newLat, lng: newLng };
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: newLocation,
          radius: 500
        }, (places, service, pagination) => {
          this.search(places, google, map);
          console.log(currentLat, currentLng)
        });
      });

      searchBox.addListener('places_changed', () => {
        this.search(searchBox.getPlaces(), google, map);
      });

      var results = actions.get(google, map, null, this.props.displayEvents.bind(this))
      .then((results) => {
        this.props.retreiveInfo(currentLat, currentLng)
        this.markers = results.markers;
        actions.addInfowindowClose(this.props.markers);
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

    this.props.retreiveInfo(searchLat, searchLng)

    map.fitBounds(bounds);
    map.setCenter({lat: searchLat, lng: searchLng})
    map.setZoom(14);

    actions.post(searchLat, searchLng, null, google, map, this.props.displayEvents.bind(this))
    .then((results) => {
      console.log('herro', results)
      this.markers = results.markers;
      actions.addInfowindowClose(this.markers);
    });

    // Hide sidebar display upon new location search
    this.props.changeDisplay();
  }




  render() {
    return (
      <div id="map"></div>
    )
  }

}

export default Map;
