var mysql = require('mysql');
var Promise = require('bluebird');

var cbMysql = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'Occa',
  port: '3000'
});

cbMysql.connect();
var connection = Promise.promisifyAll(cbMysql);

const searchEvents = ({center_lat, center_lng, range}) => {
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
    venues.url AS venueUrl, venues.postalCode, venues.image AS venueImg 
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
          lat: event.lat,
          lng: event.lng,
          url: event.venueUrl,
          postalCode: event.postalCode,
          image: event.venueImg
        }
      };
    });
  });
}

const _addNewVenue = ({givenId, name, lat, lng, url, postalCode, image}) => {
  console.log('addNewVenue HERE');
  return connection.queryAsync(
    `INSERT INTO venues (givenId, name, lat, lng, url, postalCode, image)
    VALUES ("${givenId}", "${name}", ${lat}, ${lng}, "${url}", ${postalCode}, "${image}")`)
  .then((response) => {
    console.log('addNewVenue response:', response);
    console.log('addNewVenue givenId', givenId);
    return givenId;
  })
  .catch((response) => {
    console.log('Duplicate entry, so ignore', response);
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
}


const addNewEvents = (eventObj) => {
  return connection.queryAsync(`INSERT INTO events 
    (name, startDate, startTime, image, category, url, venueId, givenId) VALUES
    ("${eventObj.name}", "${eventObj.startDate}", 
    "${eventObj.startTime}", "${eventObj.image}", 
    "${eventObj.category}", "${eventObj.url}", 
    "${eventObj.venueId}", "${eventObj.givenId}")`)
  .then((response) => {
    console.log('INSERT SUCCESS LOOOOOOL', response);
    return eventObj;
  })
  .catch((error) => {
    console.error('Issue inserting new event:', error);
  });
}


// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

module.exports = {
  searchEvents,
  searchOrCreateVenue,
  addNewEvents
}
