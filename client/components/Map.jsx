import React from 'react';
import GoogleMapsLoader from 'google-maps';
import KEYS from '../../config.js';
import mapStyles from '../mapStyles.js';
import sampleData from '../sampleData.js';
import $ from 'jquery';
import SidebarRightOverlay from './Sidebar.jsx'

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
    GoogleMapsLoader.KEY = KEYS.KEY;
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

          var infowindow = new google.maps.InfoWindow({
            content: 
              `<div class='content'>
                <h3> ${event.venue.name}</h3>
                <img src=${event.venue.image} height='75px' width='auto'/>
                <p> <a href=${event.venue.url} target='_blank'>Venue Details</a</p>
              </div>`,
              maxWidth: 150
          });

          var marker = new google.maps.Marker({
            map: map,
            icon: eventTypes[event.event.category],
            position: new google.maps.LatLng(lat, lng)
          });

          marker.addListener('click', () => {
            infowindow.open(map, marker);
          })

          markers.push(marker);
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
      <div id="container">
        <div id="map"></div>
        <SidebarRightOverlay />
      </div>
    )
  }
  
}

export default Map;