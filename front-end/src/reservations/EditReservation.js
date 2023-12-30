import React, { useEffect, useState } from "react";
import ReservationForm from "./ReservationForm";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { listReservation, editReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function EditReservation() {
  const { reservation_id } = useParams();
  const [error, setError] = useState(null);
  const history = useHistory();
  const [reservationForm, setReservationForm] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadReservation() {
      try {
        const response = await listReservation(
          reservation_id,
          abortController.signal
        );
        setReservationForm(response);
      } catch (error) {
        setError(error);
      }
    }

    loadReservation();

    return () => abortController.abort();
  }, [reservation_id]);

  function handleChange(e) {
    setReservationForm({
      ...reservationForm,
      [e.target.name]: e.target.value,
    });
  }


  function validateReservation(e) {
    e.preventDefault();
    setError(null);

    const [year, month, day] = reservationForm.reservation_date.split("-");
    const [hour, minutes] = reservationForm.reservation_time
      .split(":")
      .map((time) => Number(time));

    const reservationDate = new Date(year, month - 1, day);
    reservationDate.setHours(hour, minutes);
    const weekDay = reservationDate.getDay();
    const now = new Date();

    let errorString = "";

    if (reservationDate.getTime() < now.getTime()) {
      errorString += `Reservation must be in the future. `;
    }

    if (weekDay === 2) {
      errorString += `No reservations on Tuesdays as the restaurant is closed. `;
    }

    if ((hour === 10 && minutes < 30) || hour < 10) {
      errorString += `Restaurant opens at 10:30 AM. `;
    }

    if ((hour === 21 && minutes > 30) || hour > 21) {
      errorString += `Last reservation is at 9:30 PM. `;
    }

    if((reservationForm.status !== "booked")) {
        errorString += `Reservation status must be "booked" to edit it. `
    }

    errorString ? setError({ message: errorString }) : submitEditedReservation();
  }

  async function submitEditedReservation() {
    const abortController = new AbortController();
    try {
      const response = await editReservation(
        reservationForm,
        abortController.signal
      );
      history.push(`/dashboard?date=${response.reservation_date}`);
    } catch (error) {
      setError(error);
    }

    return ()=> abortController.abort();
  }

  if(reservationForm) return (
    <main>
      <h1>Edit Reservation</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Update the reservation</h4>
      </div>
      <ErrorAlert error={error} />
      <ReservationForm
        history={history}
        reservationForm={reservationForm}
        handleChange={handleChange}
        submitHandler={validateReservation}
      />
    </main>
  );

  return (
    <main>
      <h1>Edit Reservation</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Update the reservation</h4>
      </div>
      <ErrorAlert error={error} />
    </main>
  );
}
