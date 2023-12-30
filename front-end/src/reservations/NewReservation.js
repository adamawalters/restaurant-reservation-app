import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";


function NewReservation() {
  const [newReservationError, setNewReservationError] = useState(null);
  const history = useHistory();

  const defaultReservationForm = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const [reservationForm, setReservationForm] = useState(
    defaultReservationForm
  );

  function handleChange(event) {
    setReservationForm({
      ...reservationForm,
      [event.target.name]: event.target.value,
    });
  }

  function validateReservation(e) {
    e.preventDefault();
    setNewReservationError(null);

    const [year, month, day] = reservationForm.reservation_date.split("-")
    const [hour, minutes] = reservationForm.reservation_time.split(":").map((time) => Number(time));

    const reservationDate = new Date(year, month-1, day);
    reservationDate.setHours(hour, minutes)
    const weekDay = reservationDate.getDay();
    const now = new Date();

    let errorString = "";

    if (reservationDate.getTime() < now.getTime()) {
      errorString += `Front end validation: Reservation must be in the future.`;
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

    errorString
      ? setNewReservationError({ message: errorString })
      : submitNewReservation();
  }


  async function submitNewReservation() {

   const abortController = new AbortController();
    try {
      const response = await createReservation(
        reservationForm,
        abortController.signal
      );
      setReservationForm({ ...defaultReservationForm });
      history.push(`/dashboard?date=${response.reservation_date}`);
    } catch (error) {
      setNewReservationError(error);
    }

    return ()=>abortController.abort();
  }

  return (
    <main>
      <h1>New Reservation</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Create a new reservation</h4>
      </div>
      <ErrorAlert error={newReservationError} />
      <ReservationForm history={history} reservationForm={reservationForm} handleChange={handleChange} submitHandler={validateReservation}/>
    </main>
  );
  

}


  

export default NewReservation;
