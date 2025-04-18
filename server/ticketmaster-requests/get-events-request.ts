import axios from "axios";
require("dotenv").config({ path: "./.env.production" });
import { formatDateAndTimeObj, formatImageObj } from "../../utils";

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
  return axios(getEvents).then(({ data: { _embedded: { events } } }) => {
    const trimmedEvents = events.map((e: any) => {
        return {
            name: e.name,
            api_event_id: e.id,
            url: e.url,
            img: formatImageObj(e.images[0]),
            date_and_time: formatDateAndTimeObj(e.dates),
            tags: [e.classifications[0].segment.name, e.classifications[0].genre.name],
            info: e.info,
            location: e.place || {location: "No Location Provided"},
            description: e.promoter?.description || "",
        }
    })
    return trimmedEvents
  })
  .catch((err) => {
    console.log(err)
  })
};
