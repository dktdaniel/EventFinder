const Express = require('express');
const Promise = require('bluebird');
const bodyParser = require('body-parser');
const ticketmaster = require('./ticketmaster.js');
const db = require('../db/index.js');
const cors = require('cors');

const app = Express();

app.use(bodyParser.json());
app.use(cors());

//Serve up static html
app.use(Express.static(__dirname + '/../client'));



app.get('/events', (req, res) => {


  var requestBody = Object.keys(req.body).length ? req.body : {
    lat: 37.788799,
    lng: -122.394798,
    rad: 5
  };

   var range = 0.0145 * requestBody.rad;
   var options = {
     center_lat: requestBody.lat,
     center_lng: requestBody.lng,
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
        return db.searchOrCreateVenue(event.venue)
        .then( id => {
          event.event.venueId = id;
          return db.addNewEvents(event);
        });
      }))

    })
    .then( events => {
      res.send(events)
    })
    .catch( events => {
      console.log('What am I catching?', events);
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
