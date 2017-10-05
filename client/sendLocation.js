import $ from 'jquery';

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
      var markers = data.map(event => {
        var marker = this._createMarker(event, google, map, cb);
        marker.addListener('click', () => {
          cb(data, marker.venueId);
        });
        this._createInfoWindow(marker, event, google, map);
        return marker;
      });
      return {events: data, markers: markers};
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
      var markers = data.map( event => {
        var marker = this.a._createMarker(event, google, map);
        marker.addListener('click', () => {
          cb(data, marker.venueId);
        });
        this.a._createInfoWindow(marker, event, google, map);
        return marker;
      });
      return {events: data, markers: markers};
    })
    .fail((err) => {
      console.error(err);
    });
  },

  _createMarker: (event, google, map) => {
      var lat = Number(event.venue.lat);
      var lng = Number(event.venue.lng);
      var marker = new google.maps.Marker({
        map: map,
        icon: eventTypes[event.event.category],
        position: new google.maps.LatLng(lat, lng),
        venueId: event.venue.givenId
      });

      return marker;
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
  }
}

export default actions;
