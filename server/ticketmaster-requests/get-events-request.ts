import axios from "axios";
require("dotenv").config({ path: "./.env.production" });

let apiKey = process.env.API_KEY;

interface GetEventsRequest {
  method: string;
  url: string;
  params: {
    apikey: any;
    size: number;
  };
}

const getEvents: GetEventsRequest = {
  method: "GET",
  url: `https://app.ticketmaster.com/discovery/v2/events/`,
  params: {
    apikey: apiKey,
    size: 50,
  },
};

export const getTicketmasterEvents = () => {
  axios(getEvents).then(({ data: { _embedded: { events } } }) => {
    const trimmedEvents = events.map((e: any) => {
        return {
            api_event_id: e.id,
            name: e.name,
            location: e.place,
            dates: e.dates,
            tags: [e.classifications[0].segment.name, e.classifications[0].genre.name],
            image: e.images[0],
            info: e.info,
            description: e.promoter.description,
            url: e.url,
        }
    })
    console.log({trimmedEvents})
  })
};
