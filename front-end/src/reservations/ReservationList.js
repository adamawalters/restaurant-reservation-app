import React from "react";
import ReservationRow from "./ReservationRow";

function ReservationList({ reservations }) {
  const tableHeader = (
    <tr>
      <th>ID</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Mobile Number</th>
      <th>Reservation Date</th>
      <th>Reservation Time</th>
      <th>People</th>
      <th></th>
    </tr>
  );


  const reservationRows = reservations.map((reservation) => {
    return (
      <ReservationRow
        key={reservation.reservation_id}
        reservation={reservation}
      />
    );
  });

  return (
    <table className="table table-striped table-hover">
      <caption>List of reservations</caption>
      <thead>
        {tableHeader}
      </thead>
      <tbody>
        {reservationRows}
        </tbody>
    </table>
  );
}

export default ReservationList;
