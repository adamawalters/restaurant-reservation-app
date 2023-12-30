import React from "react";
import CancelButton from "../ui-elements/CancelButton";
import SubmitButton from "../ui-elements/SubmitButton";

function ReservationForm({
  reservationForm,
  history,
  handleChange,
  submitHandler,
}) {
  const form = (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <label htmlFor="first_name">First Name</label>
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
        <label htmlFor="last_name">Last Name</label>
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
        <label htmlFor="reservation_date">Reservation Date</label>
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
        <label htmlFor="reservation_time">Reservation Time</label>
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
        <label htmlFor="people">Number of Guests</label>
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
      <div className="d-flex justify-content-between">
        <SubmitButton />
        <CancelButton history={history} />
      </div>
    </form>
  );

  return form;
}

export default ReservationForm;
