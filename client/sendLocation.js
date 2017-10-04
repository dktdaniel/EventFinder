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
  get: function(google, map) {
    $.ajax('http://localhost:3000/events')
    .done(data => {
      console.log('DATA:', data);
      var markers = data.map( event => {
        console.log(this);
        var marker = this._createMarker(event, google, map);
        this._createInfoWindow(marker, event, google, map);
        return marker;
      });
      return {events: data, markers: markers};
    });
  },

  post: (lat, lng, google, map) => {
    var context = this;
    $.ajax({
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
    .done(data => {
      console.log(data);
      var markers = data.map( event => {
        console.log(this, context);
        var marker = this.a._createMarker(event, google, map);
        this.a._createInfoWindow(marker, event, google, map);
        return marker;
      });
      return {events: data, markers: markers};
    })
    .fail((err) => {
      console.error(err);
    });
  },

  _createMarker: function(event, google, map) {
      var lat = Number(event.venue.lat);
      var lng = Number(event.venue.lng);
      console.log('Google Maps Obj:', google);
      var marker = new google.maps.Marker({
        map: map,
        icon: eventTypes[event.event.category],
        position: new google.maps.LatLng(lat, lng)
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
  }
}

export default actions;
