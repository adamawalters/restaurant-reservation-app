import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { updateReservationStatus } from "../utils/api";

function ReservationRow({ reservation, setUpdateReservations, setError }) {



  async function cancelReservation(){

    const abortController = new AbortController();
    const canCancel = window.confirm("Do you want to cancel this reservation? This cannot be undone.")
    if(canCancel) {
      try {
        await updateReservationStatus(reservation.reservation_id, "cancelled", abortController.signal);
        setUpdateReservations((current) => !current);
      } catch (error) {
        setError(error);
      }
    } 

    return ()=> abortController.abort();
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
          <Link className="btn btn-primary" to={`/reservations/${reservation.reservation_id}/seat`}>
            Seat
          </Link>
        ) : null}
      </td>
      <td><button className="btn btn-info"><Link className="text-reset" to={`/reservations/${reservation.reservation_id}/edit`}>Edit</Link></button></td>
      <td><button className="btn btn-danger" data-reservation-id-cancel={reservation.reservation_id} onClick={cancelReservation}>Cancel</button></td>
    </tr>
  );
}

export default ReservationRow;
