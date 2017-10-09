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

  const options = {
    method: 'GET',
    uri: 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=' + api +
          '&latlong=' + lat + ',' + lng +
          '&radius=' + rad +
          '&unit=miles' +
          '&startDateTime=' + iso_date +
          '&endDateTime=' + iso_endDate
  }

  return request(options)
  .then(data => {
    data = JSON.parse(data);
    console.log(data)
    var events = data._embedded.events;
    console.log(events, events.length)
    return events.map( event => {
      console.log(event)
      return {
        event: {
          name: event.name,
          givenId: event.id,
          startDate: event.dates.start.localDate,
          startTime: event.dates.start.localTime || "00:00:00",
          image: event.images[0].url,
          category: event.classifications ? event.classifications[0].segment.name : "Undefined",
          url: event.url
        },

        venue: {
          givenId: event._embedded.venues[0].id,
          name: event._embedded.venues[0].name,
          address: event._embedded.venues[0].address.line1,
          lat: event._embedded.venues[0].location.latitude,
          lng: event._embedded.venues[0].location.longitude,
          url: event._embedded.venues[0].url,
          postalCode: event._embedded.venues[0].postalCode,
          image: event._embedded.venues[0].images ? event._embedded.venues[0].images[0].url : null
        }
      };
    });
  })
  .catch((err) => {
    console.error(err);
    return err;
  });
};

module.exports = {
  getEvents
}
