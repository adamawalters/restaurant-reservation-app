import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { updateReservationStatus } from "../utils/api";

function ReservationRow({ reservation }) {
  let abortController = new AbortController();

  async function handleSeat(){
    abortController.abort();
    abortController = new AbortController();
    try {
      await updateReservationStatus(reservation.reservation_id, "seated", abortController.signal)
    } catch (error) {
      //Set dashboard error ?
      console.log("Error!")
    }
  
  }

  return (
    <tr>
      <td>{reservation.reservation_id}</td>
      <td>{reservation.first_name}</td>
      <td>{reservation.last_name}</td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.reservation_date}</td>
      <td>{reservation.reservation_time}</td>
      <td>{reservation.people}</td>
      <td><span data-reservation-id-status={reservation.reservation_id}>{reservation.status}</span></td>
      <td>
        {reservation.status === "booked" ? (
          <Link to={`/reservations/${reservation.reservation_id}/seat`}>
            Seat
          </Link>
        ) : null}
      </td>
    </tr>
  );
}

export default ReservationRow;
