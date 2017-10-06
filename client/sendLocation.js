import $ from 'jquery';
import KEY from '../config.js';

const eventTypes = {
  'Music': 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  'Arts & Theatre': 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
  'Film': 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
  'Sports': 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
  'Miscellaneous': 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
  'Undefined': 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
}

var actions = {
  get: function(google, map, cb) {
    return $.ajax('http://localhost:3000/events')
    .then(data => {
      console.log('DATA:', data);
      return this._prepMarkers(data, cb, google, map)
      .then(markers => {
        console.log('Markers:', markers);
        console.log('IS data still here?', data);
        return {events: data, markers: markers}
      });
    });
  },

  post: (lat, lng, google, map, cb) => {
    return $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/events',
      data: {
        data: JSON.stringify({
          lat: lat,
          lng: lng,
          rad: 5
        })
      }
    })
    .then(data => {
      return this.a._prepMarkers(data, cb, google, map)
      .then(markers => {
        console.log('Markers:', markers);
        return {events: data, markers: markers}
      });
    })
    .fail((err) => {
      console.error(err);
    });
  },

  _pinMarker: (lat, lng, event, google, map) => {
    console.log('Event:', event);
    console.log('Google Obj', google);
    console.log('Maps Obj', map);
    return new google.maps.Marker({
      map: map,
      icon: eventTypes[event.event.category],
      position: new google.maps.LatLng(lat, lng),
      venueId: event.venue.givenId
    });
  },

  _prepMarkers: (data, cb, google, map) => {
    return Promise.all(data.map(event => {
      console.log('THIS keyword before getCoordinate:', this)
      return this.a.getCoordinate(event.venue.address, event.venue.postalCode)
      .then(({lat, lng}) => {
        console.log('Lat Lng:', lat, lng);
        console.log('This keyword before _pinMarker', this);
        var marker = this.a._pinMarker(lat, lng, event, google, map);
        marker.addListener('click', () => {
          cb(data, marker.venueId);
        });
        this.a._createInfoWindow(marker, event, google, map);
        return marker;
      })
    }));
  },

  _createInfoWindow: (marker, event, google, map) => {
    var infowindow = new google.maps.InfoWindow({
      content:
        `<div class='content'>
          <h3> ${event.venue.name}</h3>
          <img src=${event.venue.image} height='75px' width='auto'/>
          <p> <a href=${event.venue.url} target='_blank'>Venue Details</a</p>
        </div>`,
        maxWidth: 150
    });

    marker.addListener('click', () => {
      infowindow.open(map, marker);
    });
  },

  removeMarkers: markers => {
    markers.forEach(marker => marker.setMap(null))
  },

  getCoordinate(address, postalCode) {
    return $.ajax({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address+postalCode},+CA&key=${KEY.KEY}`,
      type: "GET",
      format: 'application/JSON'
    })
    .then(data => data.results[0].geometry.location)
    .catch(err => {
      console.error(err);
    });

  }
}



export default actions;
