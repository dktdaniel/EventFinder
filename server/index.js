const Express = require('express');
const Promise = require('bluebird');
const bodyParser = require('body-parser');
const ticketmaster = require('./ticketmaster.js');
const db = require('../db/index.js');

const app = Express(); 

app.use(bodyParser.json());

//Serve up static html


app.get('/', (req, res) => {
  
  var requestBody = {
    lat: 37.788799,
    lng: -122.394798,
    rad: '5'
  };

  ticketmaster.getEvents(requestBody)
  .then((processedData) => {
    console.log(JSON.stringify(processedData));
    res.status(200).send(processedData);
  })
  .catch((err) => {
    console.error(err);
  });
  
})

app.listen(3000, () => {
  console.log('Listening on Port 3000!');
});