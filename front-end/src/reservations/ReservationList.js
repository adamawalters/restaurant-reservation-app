import React from "react";
import ReservationRow from "./ReservationRow";

function ReservationList({ reservations, setUpdateReservations , setError}) {
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
      <th></th>
      <th></th>
      <th></th>
    </tr>
  );

  const reservationRows = reservations
    .map((reservation) => {
      return (
        <ReservationRow
          key={reservation.reservation_id}
          reservation={reservation}
          setUpdateReservations={setUpdateReservations}
          setError={setError}
        />
      );
    });

  return (
    <div className="overflow-auto" style={{ maxHeight: "100%"}}>
      <table className="table table-striped table-hover table-sm" style={{tableLayout : "fixed"}}>
        <caption>List of reservations</caption>
        <thead>{tableHeader}</thead>
        <tbody>{reservationRows}</tbody>
      </table>
    </div>
  );
}

export default ReservationList;
