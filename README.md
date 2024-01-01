# Restaurant Reservation System


## Summary
This is a full-stack application designed for restaurant staff. It lets staff members manage reservations and also keep track of free tables while customers are dining. 

### Reservation management features - restaurant staff can:
1. Log reservations into the system to track them
2. View reservations for a certain date
3. Search for reservations by phone number
4. Edit reservation details 
5. Cancel reservations
6. Seat a reservation at a table (assign a reservation to a table)

### Table management features - restaurant staff can:
1. View which tables are free and occupied
2. Finish a reservation and free up a table so another reservation can be assigned to it

## Screenshots
1. ![Dashboard] (https://github.com/adamawalters/restaurant-reservation-app/blob/dev/screenshots/Dashboard.png?raw=true)
2. ![Edit Reservation] (https://github.com/adamawalters/restaurant-reservation-app/blob/dev/screenshots/Edit_Reservation.png?raw=true)
3. ![New Reservation] (https://github.com/adamawalters/restaurant-reservation-app/blob/dev/screenshots/New_Reservation.png?raw=true)
4. ![New Table] (https://github.com/adamawalters/restaurant-reservation-app/blob/dev/screenshots/New_Table.png?raw=true)
5. ![Search Reservation] (https://github.com/adamawalters/restaurant-reservation-app/blob/dev/screenshots/Search_Reservation.png?raw=true)

## API

The server is built with Express and connects to a PostgreSQL database. It supports the following endpoints for CRUD actions:

/reservations
1. GET: returns an array of reservation objects (can accept a date query parameter or search query parameter). Leveraged on the Dashboard & Search Reservation screens. 
2. POST: creates and saves a reservation to the database. Leveraged on the "New Reservation" screen

/reservations/:reservation_id
1. GET: returns a reservation object. Leveraged on the Edit Reservation and Seat Reservation screens. 
2. PUT: updates a reservation in the database. Leveraged on the Edit Reservation screen. 

/reservations/:reservation_id/status
1. PUT: updates the status of a reservation - can be "booked", "seated", "finished", or "cancelled". Leveraged on the "Dashboard" screen when a reservation is finished at a table, or when a reservation is cancelled. 

/tables
1. GET: returns an array of table objects. Leveraged on the "Dashboard" screen. 
2. POST: adds a table to the database. Leveraged on the "New Table" screen.

/tables/:table_id/seat
1. PUT: Updates the table in the database by assigning a reservation to the table.
2. DELETE: Removes the reservation ID from a table. Leveraged on the "Dashboard" screen when a reservation is finished at a table. 


 
## Tech Stack


## Installation

1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your PostgreSQL database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start your server in development mode.


