// Top-level event object
export interface EventInterface {
  event_id?: number,
  api_event_id?: string;
  name: string;
  location?: LocationInterface;
  date_and_time?: DateTimeInterface;
  tags: string[];
  img?: ImageInterface[];
  info?: string;
  description: string;
  url?: string;
}

// Location object
interface LocationInterface {
  city: string;
  country: string;
  country_code: string;
}

// Date and time object
interface DateTimeInterface {
  start_date: string;
  start_time: number; // in hour format
  end_date: string;
  end_time: number; // in hour format
  timezone: string;
}

// Image object
interface ImageInterface {
  url: string;
  ratio: string;
  width: number;
  height: number;
}

const events: EventInterface[] = [
  {
    api_event_id: "G5vVZbowlaVz5",
    name: "New York Yankees vs. Baltimore Orioles",
    location: {
      city: "Bronx",
      country: "USA",
      country_code: "US",
    },
    date_and_time: {
      start_date: "2025-06-21",
      start_time: 13,
      end_date: "2025-06-21",
      end_time: 16,
      timezone: "America/New_York",
    },
    tags: ["Sports", "Baseball"],
    img: [
      {
        url: "https://s1.ticketm.net/dam/a/7e0/479ac7e7-15fb-44ba-8708-fc1bf2d037e0_RETINA_PORTRAIT_3_2.jpg",
        ratio: "3_2",
        width: 640,
        height: 427,
      },
    ],
    info: "Please adhere to published limits. Persons who exceed the ticket limit may have any or all of their orders and tickets cancelled without notice by Ticketmaster in its discretion...",
    description: "New York Yankees vs. Baltimore Orioles at Yankee Stadium",
    url: "https://www.ticketmaster.com/new-york-yankees-vs-baltimore-orioles-bronx-new-york-06-21-2025/event/1D00611CAB274E0B",
  },
  {
    name: "Lo-Fi Beats Night",
    location: {
      city: "Brooklyn",
      country: "USA",
      country_code: "US"
    },
    date_and_time: {
      start_date: "2025-05-01",
      start_time: 20,
      end_date: "2025-05-01",
      end_time: 23,
      timezone: "EST"
    },
    tags: ["music", "lofi", "chill"],
    img: [
      {
        url: "https://example.com/lofi.jpg",
        ratio: "16_9",
        width: 1280,
        height: 720
      }
    ],
    info: "A cozy night of lo-fi beats and mellow vibes.",
    description: "Join us for a laid-back evening featuring lo-fi artists and ambient lighting.",
    url: "https://ticket.link/event/lofi"
  },
  {
    name: "JavaScript Conference 2025",
    location: {
      city: "San Francisco",
      country: "USA",
      country_code: "US"
    },
    date_and_time: {
      start_date: "2025-06-12",
      start_time: 9,
      end_date: "2025-06-14",
      end_time: 17,
      timezone: "PST"
    },
    tags: ["tech", "javascript", "conference"],
    img: [
      {
        url: "https://example.com/jsconf.png",
        ratio: "3_2",
        width: 1024,
        height: 683
      }
    ],
    info: "The biggest JS conference of the year.",
    description: "Speakers from top companies, hands-on workshops, and cool swag.",
    url: "https://ticket.link/event/jsconf"
  },
  {
    api_event_id: "G5vVZbowl3fyp",
    name: "New York Yankees vs. Houston Astros",
    location: {
      city: "Bronx",
      country: "USA",
      country_code: "US",
    },
    date_and_time: {
      start_date: "2025-08-08",
      start_time: 19,
      end_date: "2025-08-08",
      end_time: 22,
      timezone: "America/New_York",
    },
    tags: ["Sports", "Baseball"],
    img: [
      {
        url: "https://s1.ticketm.net/dam/a/7e0/479ac7e7-15fb-44ba-8708-fc1bf2d037e0_RETINA_PORTRAIT_3_2.jpg",
        ratio: "3_2",
        width: 640,
        height: 427,
      },
    ],
    info: "Please adhere to published limits. Persons who exceed the ticket limit may have any or all of their orders and tickets cancelled without notice by Ticketmaster in its discretion...",
    description: "New York Yankees vs. Houston Astros at Yankee Stadium",
    url: "https://www.ticketmaster.com/new-york-yankees-vs-houston-astros-bronx-new-york-08-08-2025/event/1D00611CAB494E56",
  },
  {
    api_event_id: "G5vVZbownXfgv",
    name: "New York Yankees vs. Toronto Blue Jays",
    location: {
      city: "Bronx",
      country: "USA",
      country_code: "US",
    },
    date_and_time: {
      start_date: "2025-04-26",
      start_time: 13,
      end_date: "2025-04-26",
      end_time: 16,
      timezone: "America/New_York",
    },
    tags: ["Sports", "Baseball"],
    img: [
      {
        url: "https://s1.ticketm.net/dam/a/7e0/479ac7e7-15fb-44ba-8708-fc1bf2d037e0_RETINA_PORTRAIT_3_2.jpg",
        ratio: "3_2",
        width: 640,
        height: 427,
      },
    ],
    info: "Please adhere to published limits. Persons who exceed the ticket limit may have any or all of their orders and tickets cancelled without notice by Ticketmaster in its discretion...",
    description: "New York Yankees vs. Toronto Blue Jays at Yankee Stadium",
    url: "https://www.ticketmaster.com/new-york-yankees-vs-toronto-blue-bronx-new-york-04-26-2025/event/1D00611CAAF94D41",
  },
  {
    api_event_id: "G5vVZbowl57zE",
    name: "New York Yankees vs. Athletics",
    location: {
      city: "Bronx",
      country: "USA",
      country_code: "US",
    },
    date_and_time: {
      start_date: "2025-06-28",
      start_time: 13,
      end_date: "2025-06-28",
      end_time: 16,
      timezone: "America/New_York",
    },
    tags: ["Sports", "Baseball"],
    img: [
      {
        url: "https://s1.ticketm.net/dam/a/7e0/479ac7e7-15fb-44ba-8708-fc1bf2d037e0_RETINA_PORTRAIT_3_2.jpg",
        ratio: "3_2",
        width: 640,
        height: 427,
      },
    ],
    info: "Please adhere to published limits. Persons who exceed the ticket limit may have any or all of their orders and tickets cancelled without notice by Ticketmaster in its discretion...",
    description: "New York Yankees vs. Athletics at Yankee Stadium",
    url: "https://www.ticketmaster.com/new-york-yankees-vs-athletics-bronx-new-york-06-28-2025/event/1D00611CAB2C4E27",
  },
];

export default events 
