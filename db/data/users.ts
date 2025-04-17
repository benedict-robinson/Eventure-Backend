interface UserInterface {
    username: string,
    email?: string,
    is_staff: boolean,
    image_url?: string,
    favourites?: number[],
    going?: number[],
    owned_events?: number[]
}

const users: UserInterface[] = [
    {
      username: "user1",
      email: "user1@example.com",
      is_staff: true,
      image_url: "https://avatar.iran.liara.run/public/boy?username=Ash",
      favourites: [3, 6, 1],
      going: [3, 2],
      owned_events: [3] 
    },
    {
        username: "user2",
        email: "user2@example.com",
        is_staff: false,
        image_url: "https://avatar.iran.liara.run/public/boy?username=Ash",
        favourites: [4],
        going: [2, 3, 5],
        owned_events: [] 
      },
    { username: "user3", is_staff: false }
  ];

  export default users