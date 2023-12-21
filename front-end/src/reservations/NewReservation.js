import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createReservation } from "../utils/api";

function NewReservation() {
  const [newReservationError, setNewReservationError] = useState(null);
  const history = useHistory();
  let resAbortController = new AbortController();

  const defaultReservationForm = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: null,
  };

  const [reservationForm, setReservationForm] = useState(
    defaultReservationForm
  );

  function handleChange(event) {
    if (event.target.name === "people") {
      setReservationForm({
        ...reservationForm,
        [event.target.name]: Number(event.target.value),
      });
    } else {
      setReservationForm({
        ...reservationForm,
        [event.target.name]: event.target.value,
      });
    }
  }

  async function submitNewReservation(e) {
    e.preventDefault();
    resAbortController.abort();
    resAbortController = new AbortController();
    try {
      const response = await createReservation(
        reservationForm,
        resAbortController.signal
      );
      setReservationForm({ ...defaultReservationForm });
      history.push(`/dashboard?date=${response.reservation_date}`);
    } catch (error) {
      if (error.name === "AbortError") {
        //abort request
      } else {
        setNewReservationError(error);
      }
    }
  }

  const submitBtn = (
    <button type="submit" className="btn btn-primary">
      Submit
    </button>
  );

  const cancelBtn = (
    <button
      type="button"
      className="btn btn-danger"
      onClick={() => history.goBack()}
    >
      Cancel
    </button>
  );

  const form = (
    <form onSubmit={submitNewReservation}>
      <div className="form-group">
        <label htmlFor="first_name"> First Name </label>
        <input
          type="text"
          className="form-control"
          id="first_name"
          name="first_name"
          onInvalid={(e) =>
            e.target.setCustomValidity("Error: please provide a first name")
          }
          value={reservationForm.first_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="last_name"> Last Name </label>
        <input
          type="text"
          className="form-control"
          id="last_name"
          name="last_name"
          onInvalid={(e) =>
            e.target.setCustomValidity("Error: please provide a last name")
          }
          value={reservationForm.last_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="mobile_number">Mobile Number</label>
        <input
          type="tel"
          className="form-control"
          id="mobile_number"
          name="mobile_number"
          value={reservationForm.mobile_number}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="reservation_date"> Reservation Date </label>
        <input
          type="date"
          className="form-control"
          id="reservation_date"
          name="reservation_date"
          placeholder="YYYY-MM-DD"
          pattern="\d{4}-\d{2}-\d{2}"
          value={reservationForm.reservation_date}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="reservation_time">Reservation Time </label>
        <input
          type="time"
          className="form-control"
          id="reservation_time"
          name="reservation_time"
          placeholder="HH:MM"
          pattern="[0-9]{2}:[0-9]{2}"
          value={reservationForm.reservation_time}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="people"> Number of Guests </label>
        <input
          type="number"
          className="form-control"
          id="people"
          name="people"
          min="1"
          value={reservationForm.people}
          onChange={handleChange}
          required
        />
      </div>
      <div className="d-md-flex justify-content-between">
        {submitBtn}
        {cancelBtn}
      </div>
    </form>
  );

  return (
    <main>
      <h1>New Reservation</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Create a new reservation</h4>
      </div>
      <ErrorAlert error={newReservationError} />
      {form}
    </main>
  );
}

export default NewReservation;
