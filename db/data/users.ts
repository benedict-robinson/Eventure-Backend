export interface UserInterface {
    username: string,
    email?: string,
    is_staff: boolean,
    image_url?: string
}

const users: UserInterface[] = [
    {
      username: "user1",
      email: "user1@example.com",
      is_staff: true,
      image_url: "https://avatar.iran.liara.run/public/boy?username=Ash"
    },
    {
        username: "user2",
        email: "user2@example.com",
        is_staff: false,
        image_url: "https://avatar.iran.liara.run/public/boy?username=Ash"
      },
    { username: "user3", is_staff: false }
  ];

  export default users