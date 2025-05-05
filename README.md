# Eventure - Event Platform Backend API

## 🧩 Overview

This is the **backend** for the Eventure Event Platform Web App. It is a **RESTful API** built using **Node.js** and **Express**, providing endpoints to interact with event data, users, and favourites/going lists.

The API handles CRUD operations for events and users, allows event organisers to manage their events, and supports filtering, favouriting, and tracking event attendance.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/event-platform-backend.git
cd event-platform-backend
```
### 2. Install Dependencies

Ensure you have **Node.js** and **npm** installed.

```bash
npm install
```
### 3. Set Up Environment Variables

Copy and modify the .env.example file to match your configuration:

```bash
cp .env.example .env
```
Update the .env file with your database credentials, API keys, and any other required configuration. Example variables might include:
```env
PGDATABASE=your_database_here
PGUSER=your_username_here
PGPASSWORD=your_password_here
VITE_API_BASE_URL=http://localhost:4000/api
```
### 4. Setup Database(s) and Seed Data

Make sure you have your databases set up.

```bash
npm run setup-dbs
npm run seed
```

💻 Running the API Locally
Once the setup is complete, you can run the API locally:

```bash
npm run dev
```
The API should now be available at http://localhost:4000.

---

## 📚 API Endpoints

### **Events**

#### `GET /api/events`

Returns an array of all events. You can filter the results using the following query parameters:

- `city`: Filter events by city name.
- `countryCode`: Filter events by country code.
- `classificationName`: Filter events by category/genre.
- `sort`: Sort events by date. Accepts `date-asc` or `date-desc`.

> Includes events from both the database and Ticketmaster API.

#### `GET /api/events/event/:event_id`

Returns a specific event by its ID.

#### `POST /api/events/:username`

Creates a new event associated with a specific user.

- **Authorization**: Requires staff authorization.
- **Action**: Adds the event to the database and associates it with the user.

#### `PATCH /api/events/:username/event/:event_id`

Updates an existing event.

- **Authorization**: Requires staff authorization and event ownership.
- **Action**: Can update various event properties, including nested objects.

#### `DELETE /api/events/:username/event/:event_id`

Deletes an event.

- **Authorization**: Requires staff authorization and event ownership.
- **Action**: Removes the event from both the events table and user associations.

---

### **Users**

#### `GET /api/users`

Returns an array of all users.

#### `GET /api/users/:username`

Returns a specific user by username.

#### `POST /api/users`

Creates a new user.

- **Required Fields**: `username` and `is_staff` at minimum.

#### `PATCH /api/users/:username`

Updates an existing user's information.

- **Note**: You cannot update `user_id`.

#### `DELETE /api/users/:username`

Deletes a specific user.

---

### **Favourites**

#### `GET /api/favourites/:user_id`

Returns all events favorited by a specific user.

#### `POST /api/favourites/:user_id`

Adds an event to a user's favorites.

- **Required**: Matching `user_id` in both body and URL path.

#### `DELETE /api/favourites/:user_id/event/:event_id`

Removes an event from a user's favorites.

---

### **Going**

#### `GET /api/going/:user_id`

Returns all events a user is marked as attending.

#### `POST /api/going/:user_id`

Marks that a user is attending an event.

- **Required**: Matching `user_id` in both body and URL path.

#### `DELETE /api/going/:user_id/event/:event_id`

Removes the "going" status for a user and event.

---

### **My Events**

#### `GET /api/my-events/:user_id`

Returns all events created/owned by a specific user.

- **Authorization**: Requires staff authorization.

---

## 🧑‍💻 Testing

To test the API, you can use the following command:

```bash
npm test
```

## 🔧 Tools & Libraries Used

- **Express.js**: Web framework for Node.js.
- **PostgreSQL**: Database used for storing event and user data.
- **dotenv**: Loads environment variables from a `.env` file.

---

## 📝 Notes

- Ensure you have **PostgreSQL** installed and running, or configure a remote database.
- You may need to register your app with **Ticketmaster** and **Google APIs** to retrieve external event data or authenticate users.

---

**Contact**

For enquires or support, general or specific, please contact:

Name: Benedict Robinson <br />
Email: benedict.r1713@gmail.com <br />
GitHub: benedict-robinson <br />


**Thank you for your interest in the Eventure Backend API repository!**


