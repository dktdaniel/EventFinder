// make GET requests to ticketmaster API 
const api = require('../config.js');
const request = require('request-promise');

const getEvents = ({lat, lng, rad = '10'}) => {
  console.log('api', api.API_KEY);
  const options = {
    method: 'GET',
    url: 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=' + api.API_KEY,
    latlong: lat + ',' + lng,
    radius: rad,
    unit: 'miles'
  }

  return request(options);
};

module.exports = {
  getEvents
}