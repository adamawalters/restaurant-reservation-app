import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function NewReservation() {
  const [newReservationError, setNewReservationError] = useState(null);
  const history = useHistory();
  const [fNameError, setFNameError] = useState(false);
  const [lNameError, setLNameError] = useState(false);

  function submitNewReservation(e) {
    e.preventDefault();
    validateForm(e.target);
    console.log("reservation submitted!")
  }

  function validateForm(form) {
   
    const formData = new FormData(form);
    let formFirstName = formData.get("first_name");
    let formLastName = formData.get("last_name")

    if(formFirstName.trim().length === 0) {
        setFNameError(true);
    } else {
        setFNameError(false)
    }
    
    if(formLastName.trim().length === 0) {
        setLNameError(true)
    } else {
        setLNameError(false)
    }


  }

  const submitBtn = <button type="submit" className="btn btn-primary">Submit</button>;

  const cancelBtn = <button type="button" className="btn btn-danger" onClick={()=>history.goBack()}>Cancel</button>;

  const form = (
    <form onSubmit={submitNewReservation}>
      <div className="form-group">
        <label htmlFor="first_name"> First Name </label>
        <input
          type="text"
          className="form-control"
          id="first_name"
          name="first_name"
          required
        />
        {fNameError ?  <span>Enter a first name </span> : null}
      </div>
      <div className="form-group">
        <label htmlFor="last_name"> Last Name </label>
        <input
          type="text"
          className="form-control"
          id="last_name"
          name="last_name"
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
          required
        />
      </div>
      {submitBtn}
      {cancelBtn}
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
