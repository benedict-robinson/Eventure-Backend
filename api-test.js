const axios = require('axios');
require('dotenv').config();

let apiKey = process.env.API_KEY;

const optsEvents = {
  method: 'GET',
  url: `https://app.ticketmaster.com/discovery/v2/events/`,
  params: {
    apikey: apiKey
  }
};
// Default size is 20 unless specified otherwise
// url ALWAYS needs apikey

axios(optsEvents)
  .then(({ data: { _embedded: { events } } })=> {
    console.log(events)
  })
  .catch(error => {
    console.error('Error:', error.message);
  });