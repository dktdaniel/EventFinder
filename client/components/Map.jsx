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
      var markers = [];

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

      map.addListener('click', (event) => {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();

        var place = [lat, lng];

        markers.push(new google.maps.Marker({
          map: map,
          position: new google.maps.LatLng(place[0], place[1])
        }));

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