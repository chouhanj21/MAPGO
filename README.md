# mapGo
This appllication is in development stage.
MapGo is a website developed for the IIT-K junta, which provides the user an all-in one go-to application to navigate through the campus as well as schedule, organise 
and announce events.
The application provides a personalised maps where they can mark their areas of 
interest, and use it to navigate through the large campus.
Organising bodies get to use this application to announce their events, along with 
entire details of the event like timings, venue, description, images etc.
These events are announced under the label of verified channels, to which a user 
can subscribe to in order to get the updates specific to that organising group.
This feature is also useful to the business and shop owners who can advertise their 
businesses while also declare if their opening and closing times.

## Prerequisites
* Node.js and npm installed on your system
* MongoDB Atlas account and a database set up
* MapBox API Key

## Getting started
### Cloning the repository
Check out the [link](https://support.atlassian.com/bitbucket-cloud/docs/clone-a-git-repository/) to see how to clone the repository.

### install the dependencies
```bash
cd backend
npm install
```
```bash
cd view
npm install
```
### create .env file in the backend directory
<!-- Following the .env.example file, fill in the required credentials. -->

In .env file, fill the required credentials as given below:
```bash 
PORT=5000
DB_URL=""
SECRET_KEY=

SMTP_HOST = smtp.gmail.com
SMTP_PORT= 587
SMTP_MAIL = 
SMTP_PASS = 
```

### running the program
```bash
cd backend
npm run dev
```
```bash
cd view
npm start
```
