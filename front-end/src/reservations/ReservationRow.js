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
      <td className="align-middle">{reservation.reservation_id}</td>
      <td className="align-middle">{reservation.first_name}</td>
      <td className="align-middle">{reservation.last_name}</td>
      <td className="align-middle">{reservation.mobile_number}</td>
      <td className="align-middle">{reservation.reservation_date}</td>
      <td className="align-middle">{reservation.reservation_time}</td>
      <td className="align-middle">{reservation.people}</td>
      <td className="align-middle"><span data-reservation-id-status={reservation.reservation_id}>{reservation.status}</span></td>
      <td className="align-middle">
        {reservation.status === "booked" ? (
          <Link className="btn btn-primary" to={`/reservations/${reservation.reservation_id}/seat`}>
            Seat
          </Link>
        ) : null}
      </td>
      <td className="align-middle"><Link className="btn btn-info" to={`/reservations/${reservation.reservation_id}/edit`}>Edit</Link></td>
      <td className="align-middle"><Link to="" className=" btn btn-danger" data-reservation-id-cancel={reservation.reservation_id} onClick={cancelReservation}>Cancel</Link></td>
    </tr>
  );
}

export default ReservationRow;
