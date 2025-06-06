const axios = require('axios');
require('dotenv').config({path: "./.env.production"});

let apiKey = process.env.API_KEY;

const optsEvents = {
  method: 'GET',
  url: `https://app.ticketmaster.com/discovery/v2/events/`,
  params: {
    apikey: apiKey,
    size: 50,
    // city: "manchester",
    classificationName: "film"
  }
};
const optsGenres = {
  method: "GET",
  url: "https://app.ticketmaster.com/discovery/v2/classifications",
  params: {
    apikey: apiKey,
    size: 50,
  }
}
const optsCities = {
  method: 'GET',
  url: "https://app.ticketmaster.com/discovery/v2/events.json",
  params: {
    apikey: apiKey,
    size: 1,
    facet: "city",
    countryCode: "GB"
  }
}
axios(optsCities)
.then(({data: {_embedded}}) => {
  // console.log(_embedded)
})
// Default size is 20 unless specified otherwise
// url ALWAYS needs apikey

function formatDateAndTimeObj(obj) {
  return {
    start_date: obj?.start?.localDate || "No Date Provided",
    start_time: obj?.start?.localTime || "No Start Time Provided",
    end_date: obj?.end?.localDate || "No End Date Provided",
    end_time: obj?.end?.localTime || "No End Time Provided",
    timezone: obj?.timezone || "No Timezone Provided"
  }
}
function formatImageObj(obj) {
  return {
    url: obj.url,
    ratio: obj.ratio,
    width: obj.width,
    height: obj.height 
  }
}

axios(optsEvents)
  .then(({ data: { _embedded: { events } } })=> {

    const trimmedEvents = events.map((e) => {
        return {
            name: e.name,
            id: e.id,
            url: e?.url,
            image: formatImageObj(e?.images[0]) || {},
            date_and_time: formatDateAndTimeObj(e.dates),
            tags: e.classifications ? [e?.classifications[0].segment.name, e?.classifications[0].genre.name]: [],
            info: e.info || "",
            location: e.place || optsEvents.params.city || {location: "No Location Provided"},
            description: e.description || e?.promoter?.description || "",
        }
    })
    //console.log(JSON.stringify(trimmedEvents, null, 2))
    // console.log(events[0])
    // console.log(trimmedEvents)
    // console.log(events[4])
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

  axios(optsGenres)
  .then(({ data: { _embedded: { classifications } } }) => {
    console.log(classifications)
    // classifications.forEach(e => {
    //   if (e.type?.name) {
    //     console.log(e.type.name)
    //   }
    // })
  })

