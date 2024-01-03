import React from "react";
import ReservationRow from "./ReservationRow";

function ReservationList({ reservations, loadReservations , setError}) {
  const tableHeader = (
    <tr>
      <th className="d-none d-md-table-cell">ID</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Mobile Number</th>
      <th>Date</th>
      <th>Time</th>
      <th className="">People</th>
      <th>Status</th>
      <th className="col-md-2"></th>
    </tr>
  );

  const reservationRows = reservations
    .map((reservation) => {
      return (
        <ReservationRow
          key={reservation.reservation_id}
          reservation={reservation}
          loadReservations={loadReservations}
          setError={setError}
        />
      );
    });

  return (
    <div className="overflow-auto" style={{ maxHeight: "100%"}}>
      <table className="table table-striped table-hover table-responsive-md table-sm small" >
        <caption>List of reservations</caption>
        <thead>{tableHeader}</thead>
        <tbody>{reservationRows}</tbody>
      </table>
    </div>
  );
}

export default ReservationList;
