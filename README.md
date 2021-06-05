# Simple Meeting/Appointment Booking

## Steps to run app

1. Create **.env** file at the root of the project i.e. at /Simple_Appointment_App and put values for **SENDGRID_API_KEY, SENDGRID_SENDER_EMAIL, MONGODB_ATLAS_URI**
2. Run the following Commands by navigating into the project root after putting relevant content in .env

```
    npm i
    npm run client-install
```

3. Run the following Commands in seperate terminals on the project root:

   ```
       npm run dev-server
   ```

   For server, and

   ```
       npm run client
   ```

   For client( in the **frontend** directory)

4. Server runs at port 8080 and client at port 3000. Open http://localhost:3000 in a browser to find client

<hr />

## Client Features(Made using React)

1. Default Page is the **Meeting Home** Page(as indicated in the top navbar)
2. Create new events/meetings by entering a user email and picking a date. Gets redirected to Meetings Tab on successful meeting/event creation and mail send
3. View Events/Meetings by clicking on the **Meetings** Tab. This tab also has a refresh button to refres the meetings.

<hr />

## Backend API Features(Made using ExpressJS)

1. Base URL for the API is http://localhost:8080/
2. EndPoints:
    * POST request to `/meeting/create-meeting` - to create a new meeting
    * GET request to `/meeting/view-meetings` - to view all meetings
    * GET request to `/meeting/view-meeting/:meetingId` - to view a specific meeting by ID

<hr />

## Database

Used **MongoDB Atlas** for cloud based MongoDB database

<hr />

## Email API

Used **SendGrid** with the help of **nodemailer** for sending Emails
