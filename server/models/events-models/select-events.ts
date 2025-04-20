const db = require("../../../db/connection.js");
import { EventInterface } from "../../../db/data/events";
import { getTicketmasterEvents } from "../../ticketmaster-requests/get-events-request";
import { formatArray } from "../../../utils";
import format from "pg-format";

export const selectEvents = (
  city = "",
  countryCode = "",
  classificationName = ""
) => {
  const params = [city, countryCode, classificationName];

  return getTicketmasterEvents(city, countryCode, classificationName).then(
    (response) => {
      const formattedEvents = response.map(
        ({
          api_event_id,
          name,
          location,
          date_and_time,
          tags,
          img,
          info,
          description,
          url,
        }: EventInterface) => [
          api_event_id,
          name,
          location,
          date_and_time,
          formatArray(tags),
          img,
          info,
          description,
          url,
        ]
      );
      const insertEventsQuery = format(
        `INSERT INTO events (api_event_id, name, location, date_and_time, tags, img, info, description, url) 
            VALUES %L
            ON CONFLICT (api_event_id) DO NOTHING;`,
        formattedEvents
      );
      return db
        .query(insertEventsQuery)

        .then(() => {

          const cityQuery = city ? `location->>'city' ILIKE '%${city}%'` : "";
          const countryQuery = countryCode
            ? `location->>'country_code' = '${countryCode}'`
            : "";
          const classificationQuery = classificationName
            ? `'${classificationName}' = ANY(tags)`
            : "";
            
          const queriesArray = [
            cityQuery,
            countryQuery,
            classificationQuery,
          ].filter((str) => str !== "");
          
          const finalQuery = ["SELECT * FROM events"];

          if (queriesArray.length > 0) {
            finalQuery.push(" WHERE ");
            queriesArray.forEach((e, i) => {
                if (i === queriesArray.length - 1) {
                    finalQuery.push(e)
                }
                else {
                    finalQuery.push(e + " AND ")
                }
            });
          }

          return db
            .query(finalQuery.join(""))
            .then(({ rows }: { rows: EventInterface[] }) => {
              return rows;
            });
        });
    }
  );
};
