const axios = require('axios');
require('dotenv').config({path: "./.env.production"});

let apiKey = process.env.API_KEY;

const optsEvents = {
  method: 'GET',
  url: `https://app.ticketmaster.com/discovery/v2/events/`,
  params: {
    apikey: apiKey,
    size: 5
  }
};
// Default size is 20 unless specified otherwise
// url ALWAYS needs apikey

axios(optsEvents)
  .then(({ data: { _embedded: { events } } })=> {
    const trimmedEvents = events.map(e => {
        return {
            name: e.name,
            id: e.id,
            url: e.url,
            image: e.images[0],
            dates: e.dates,
            tags: [e.classifications[0].segment.name, e.classifications[0].genre.name],
            info: e.info,
            location: e.place,
            description: e.promoter.description,
        }
    })
    //console.log(JSON.stringify(trimmedEvents, null, 2))
    // console.log(trimmedEvents)
    console.log(events[0])
    // console.log(events[4])
  })
  .catch(error => {
    console.error('Error:', error.message);
  });