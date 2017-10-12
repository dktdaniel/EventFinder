var mysql = require('mysql');
var Promise = require('bluebird');
// var JAWSDB_URL = require('../config.js').JAWSDB_PUCE_URL;
// var { Client } = require('pg-promise');
// var DATABASE_URL = require('../config.js').DATABASE_URL;

// Local connection, development purposes only
var cbMysql = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'eventfinder'
});

//


// var cbMysql = mysql.createConnection(JAWSDB_URL);


cbMysql.connect();
var connection = Promise.promisifyAll(cbMysql);

// const connection = new Client({
//   connectionString: DATABASE_URL,
//   ssl: true
// });
//
// connection.connect();


const searchEvents = ({center_lat, center_lng, range}) => {
  // console.log('in search events')
  var today = new Date();
  var month = today.getMonth();
  var date = today.getDate();
  month = month.toString().length === 1 ? '0' + month : month;
  date = date.toString().length === 1 ? '0' + date : date;

  var todayDate = today.getFullYear() + '-' + month + '-' + date;

  var hours = today.getHours();
  var minutes = today.getMinutes();
  var seconds = today.getSeconds();

  hours = hours.toString().length === 1 ? '0' + hours : hours;
  minutes = minutes.toString().length === 1 ? '0' + minutes : minutes;
  seconds = seconds.toString().length === 1 ? '0' + seconds : seconds;

  var todayTime = `${hours}:${minutes}:${seconds}`;
  var latMin = center_lat - range;
  var latMax = center_lat + range;
  var lngMin = center_lng - range;
  var lngMax = center_lng + range;

  if (lngMin > lngMax) {
    var temp = lngMax;
    lngMax = lngMin;
    lngMin = temp;
  }
  if (latMin > latMax) {
    var temp = latMax;
    latMax = latMin;
    latMin = temp;
  }

  var joinQuery =
    `SELECT events.*, venues.name AS venueName, venues.lat, venues.lng,
    venues.url AS venueUrl, venues.postalCode, venues.image AS venueImg, venues.address AS venueAddress
    FROM events INNER JOIN venues ON venues.givenId = events.venueId`;

  return connection.queryAsync(
    `SELECT * FROM (${joinQuery})joined WHERE
    (lat >= ${latMin} AND lat <= ${latMax}) AND
    (lng >= ${lngMin} AND lng <= ${lngMax}) AND
    (startDate >= ${todayDate})`)
  .then((response) => {
    return response.map(event => {
      return {
        event: {
          name: event.name,
          givenId: event.givenId,
          startDate: event.startDate,
          startTime: event.startTime,
          image: event.image,
          category: event.category,
          url: event.url
        },
        venue: {
          givenId: event.venueId,
          name: event.venueName,
          address: event.venueAddress,
          lat: event.lat,
          lng: event.lng,
          url: event.venueUrl,
          postalCode: event.postalCode,
          image: event.venueImg
        }
      };
    });
  })
  .catch((err) => {
    console.error(err);
    return err;
  });
}

const _addNewVenue = ({givenId, name, address, lat, lng, url, postalCode, image}) => {
  return connection.queryAsync(
    `INSERT INTO venues (givenId, name, address, lat, lng, url, postalCode, image)
    VALUES ("${givenId}", "${name}", "${address}", ${lat}, ${lng}, "${url}", ${postalCode}, "${image}")`)
  .then((response) => {
    return givenId;
  })
  .catch((response) => {
    return givenId;
  });
}

const searchOrCreateVenue = (venueObj) => {
  return connection.queryAsync(`SELECT * FROM venues WHERE givenId="${venueObj.givenId}"`)
  .then((data) => {
    if (data.length) {
      return data[0].givenId;
    } else {
      return _addNewVenue(venueObj);
    }
  })
  .catch((err) => {
    console.error(err);
    return err;
  })
}


const addNewEvents = (eventObj) => {
  return connection.queryAsync(`INSERT INTO events
    (name, startDate, startTime, image, category, url, venueId, givenId) VALUES
    ("${eventObj.event.name}", "${eventObj.event.startDate}",
    "${eventObj.event.startTime}", "${eventObj.event.image}",
    "${eventObj.event.category}", "${eventObj.event.url}",
    "${eventObj.event.venueId}", "${eventObj.event.givenId}")`)
  .then((response) => {
    return {
        event: {
          name: eventObj.event.name,
          givenId: eventObj.event.givenId,
          startDate: eventObj.event.startDate,
          startTime: eventObj.event.startTime,
          image: eventObj.event.image,
          category: eventObj.event.category,
          url: eventObj.event.url
        },
        venue: {
          givenId: eventObj.venue.givenId,
          name: eventObj.venue.name,
          address: eventObj.venue.address,
          lat: eventObj.venue.lat,
          lng: eventObj.venue.lng,
          url: eventObj.venue.url,
          postalCode: eventObj.venue.postalCode,
          image: eventObj.venue.image
        }
      };;
  })
  .catch((error) => {
    console.error('Issue inserting new event:', error);
  });
}

const saveToFavVenues = (venueObj) => {
  return connection.queryAsync(`INSERT INTO favVenues (userId, venueId) VALUES ("${venueObj.userId}", "${venueObj.givenId}")`)
  .catch((err) => {
    console.error(err);
    return err;
  })
}

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

module.exports = {
  searchEvents,
  searchOrCreateVenue,
  addNewEvents,
  saveToFavVenues
}
