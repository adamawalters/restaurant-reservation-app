# Restaurant Reservation System

## Summary
This is an application designed for restaurant staff to help staff members manage & update reservations and also keep track of which tables in the restaurant are free and occupied while customers are dining. 

[**The application is deployed at this link**](https://restaurant-reservation-app-8k8w.onrender.com). **Please note that it may take a few minutes for the server & database to boot, since they spin down with inactivity.** 

This is a full-stack application. The tech stack is ReactJS, HTML, and CSS for the frontend, Node & Express for the server, and PostgreSQL for the database.

### Reservation management features:
Restaurant staff can: 
1. Log reservations into the system to track them
2. View reservations for a certain date
3. Search for reservations by phone number
4. Edit reservation details 
5. Cancel reservations
6. Seat a reservation at a table (assign a reservation to a table)

### Table management features:
Restaurant staff can: 
1. View which tables are free and occupied
2. Finish a reservation and free up a table so another reservation can be assigned to it

## Screenshots
1. ### Dashboard
![Dashboard](https://github.com/adamawalters/restaurant-reservation-app/blob/main/screenshots/Dashboard.png)

2. ### Edit Reservation
![Edit Reservation](https://github.com/adamawalters/restaurant-reservation-app/blob/main/screenshots/Edit_Reservation.png)

3. ### New Reservation
![New Reservation](New_Reservation.png)

4. ### New Table
![New Table](https://github.com/adamawalters/restaurant-reservation-app/blob/dev/screenshots/New_Table.png?raw=true)

5. ### Search Reservation
![Search Reservation](https://github.com/adamawalters/restaurant-reservation-app/blob/dev/screenshots/Search_Reservation.png?raw=true)

## API

The server is built with Express and connects to a PostgreSQL database. It supports the following endpoints for CRUD actions:

### Reservations 
#### /reservations
1. GET: Returns an array of reservation objects (can accept a date query parameter or search query parameter). Leveraged on the Dashboard & Search Reservation screens. 
2. POST: Creates and saves a reservation to the database. Leveraged on the "New Reservation" screen

#### /reservations/:reservation_id
1. GET: Returns a reservation object. Leveraged on the Edit Reservation and Seat Reservation screens. 
2. PUT: Accepts a reservation object. Updates a reservation in the database. Leveraged on the Edit Reservation screen. 

#### /reservations/:reservation_id/status
1. PUT: Updates the status of a reservation - can be "booked", "seated", "finished", or "cancelled". Leveraged on the "Dashboard" screen within the "ReservationRow" component when a reservation is cancelled. 

### Tables
#### /tables
1. GET: Returns an array of table objects. Leveraged on the "Dashboard" screen. 
2. POST: Accepts an object with "table_name" and "capacity" properties. Adds a table to the database. Leveraged on the "New Table" screen.

#### /tables/:table_id/seat
1. PUT: Accepts an object with a "reservation_id" property. Updates the table in the database by assigning a reservation to the table. This also automatically updates the reservation status to "seated". 
2. DELETE: Removes the reservation ID from the specified table. Leveraged on the "Dashboard" screen when a reservation is finished at a table. This also automatically updates the reservation status to "cancelled". 


## Tech Stack
### Frontend:
1. HTML, React, Bootstrap, and some custom CSS.
2. It is a single-page application that uses client-side routing with React Router. 

### Backend:
1. Node, Express, Knex, and PostgreSQL.
2. Leverages controllers to respond to requests and services to update or read from the database.

### Deployment:
1. It is deployed using [Render](https://render.com/). Rewrite is enabled to enable client-side routing, where the client always queries the same server file but different pages are rendered based on the URL. 

## Installation

1. Fork and clone this repository.
2. Run `cp ./back-end/.env.sample ./back-end/.env`.
3. Update the `./back-end/.env` file with the connection URL's to your PostgreSQL database instance.
4. Run `cp ./front-end/.env.sample ./front-end/.env`.
5. Run `npm install` to install project dependencies.
6. Run `npm run start:dev` to start your server in development mode.


