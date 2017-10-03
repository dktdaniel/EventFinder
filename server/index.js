const Express = require('express');
const Promise = require('bluebird');
const bodyParser = require('body-parser');
const ticketmaster = require('./ticketmaster.js');
const db = require('../db/index.js');

const app = Express();

app.use(bodyParser.json());

//Serve up static html
app.use(express.static(__dirname + '/../client'));



app.get('/', (req, res) => {

  var requestBody = {
    lat: 37.788799,
    lng: -122.394798,
    rad: '5'
  };
   var range = 0.0145 * requestBody.rad;
   var options = {
     lat: requestBody.lat,
     lng: requestBody.lng,
     range: range
   };

  db.searchEvents(options)
    .then(events => {
      if (events.length !== 0) {
        throw events;
      }
      return ticketmaster.getEvents(requestBody)
    })
    .then(apiEvents => {
      return Promise.all(apiEvents.map( event => {
        db.searchOrCreateVenue(event.venue)
        .then( id => {
          event.event.venueId = id
        })
        .then( () => {
          return db.addNewEvents(event.event)
        })
      }))

    })
    .then( events => {
      res.send(events)
    })
    .catch( events => {
      res.send(events)
    })
  // ticketmaster.getEvents(requestBody)
  // .then((processedData) => {
  //   console.log(JSON.stringify(processedData));
  //   res.status(200).send(processedData);
  // })
  // .catch((err) => {
  //   console.error(err);
  // });

})

app.listen(3000, () => {
  console.log('Listening on Port 3000!');
});
