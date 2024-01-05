import React from "react";
import SeatReservationRow from "./SeatReservationRow";

function SeatReservationList({ reservation }) {
  const tableHeader = (
    <tr>
      <th>ID</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Mobile Number</th>
      <th>Date</th>
      <th>Time</th>
      <th>People</th>
      <th>Status</th>
    </tr>
  );

  const reservationRow = (
    <SeatReservationRow
      key={reservation.reservation_id}
      reservation={reservation}
    />
  );

  return (
    <div className="overflow-auto" style={{ maxHeight: "100%" }}>
      <table
        className="table table-striped table-hover table-sm"
        style={{ tableLayout: "fixed" }}
      >
        <caption>Reservation information</caption>
        <thead>{tableHeader}</thead>
        <tbody>{reservationRow}</tbody>
      </table>
    </div>
  );
}

export default SeatReservationList;
