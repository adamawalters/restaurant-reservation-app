import React from "react";

function SeatReservationRow({ reservation }) {
  return (
    <tr>
      <td className="align-middle">{reservation.reservation_id}</td>
      <td className="align-middle">{reservation.first_name}</td>
      <td className="align-middle">{reservation.last_name}</td>
      <td className="align-middle">{reservation.mobile_number}</td>
      <td className="align-middle">{reservation.reservation_date}</td>
      <td className="align-middle">{reservation.reservation_time}</td>
      <td className="align-middle">{reservation.people}</td>
      <td className="align-middle">
        <span data-reservation-id-status={reservation.reservation_id}>
          {reservation.status}
        </span>
      </td>
    </tr>
  );
}

export default SeatReservationRow;
