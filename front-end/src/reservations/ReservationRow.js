import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function ReservationRow({ reservation }) {
  return (
    <tr>
      <td>{reservation.reservation_id}</td>
      <td>{reservation.first_name}</td>
      <td>{reservation.last_name}</td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.reservation_date}</td>
      <td>{reservation.reservation_time}</td>
      <td>{reservation.people}</td>
      <td>
        <Link to={`/reservations/${reservation.reservation_id}/seat`}>Seat</Link>
      </td>
    </tr>
  );
}

export default ReservationRow;