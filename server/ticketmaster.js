// make GET requests to ticketmaster API 
const api = require('../config.js').API_KEY;
const request = require('request-promise');

const getEvents = ({lat, lng, rad = '2'}) => {
  var date = new Date();
  var endDate = new Date();
  endDate.setDate(endDate.getDate() + 7);
  var iso_date = date.toISOString();
  var iso_endDate = endDate.toISOString();
  iso_date = iso_date.slice(0, iso_date.length - 5) + 'Z';
  iso_endDate = iso_endDate.slice(0, iso_endDate.length - 5) + 'Z';
  console.log('ISO:', iso_date, 'JSON:', date.toJSON());
  console.log('ISO:', iso_endDate, 'JSON:', endDate.toJSON());
  // console.log(iso_endDate);
  console.log('api', api);
  const options = {
    method: 'GET',
    uri: 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=' + api +
          '&latlong=' + lat + ',' + lng +
          '&radius=' + rad + 
          '&unit=miles' +
          '&startDateTime=' + iso_date +
          '&endDateTime=' + iso_endDate
  }
// &startDateTime=2017-10-02T15:19:00Z
// &endDateTime=2017-10-09T15:18:00Z

  return request(options)
  .then(data => {
    console.log('Data from request:', JSON.parse(data));
    data = JSON.parse(data);
    var events = data._embedded.events;
    return events.map( event => {
      return {
        event: {
          name: event.name,
          givenId: event.id,
          startDate: event.dates.start.localDate,
          startTime: event.dates.start.localTime,
          image: event.images[0].url,
          category: event.classifications[0].segment.name,
          url: event.url          
        },

        venue: {
          givenId: event._embedded.venues[0].id,
          name: event._embedded.venues[0].name,
          lat: event._embedded.venues[0].location.latitude,
          lng: event._embedded.venues[0].location.longitude,
          url: event._embedded.venues[0].url,
          postalCode: event._embedded.venues[0].postalCode,
          image: event._embedded.venues[0].images ? event._embedded.venues[0].images[0].url : null
        }
      };
    });
  });
};

module.exports = {
  getEvents
}