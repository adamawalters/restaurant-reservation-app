import React, { useState, useEffect } from "react";
import ReservationList from "./ReservationList";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations } from "../utils/api";

export default function SearchReservation() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [reservations, setReservations] = useState(null);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
  let abortController = new AbortController();
  const [updateReservations, setUpdateReservations] = useState(false);

  function handleChange(e){
    setMobileNumber(e.target.value);
  }

  async function handleSumbit(){
    setNotFound(false);
    setReservations(null);
    abortController.abort();
    abortController = new AbortController();

    try {
        const response = await listReservations({mobile_number : mobileNumber}, abortController.signal);
        if(response.length) {
            setReservations(response);
        } else {
            setNotFound(true);
        }
    } catch (error) {
        setError(error);
    }
  }

  useEffect(()=>{
    if(mobileNumber) {
      handleSumbit();
    }
  }, [updateReservations])



  return (
    <main>
      <h1>Search for Reservation</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Search for reservations by customer phone number</h4>
      </div>
      <ErrorAlert error={error} />
      <input
      name="mobile_number"
      type="tel"
      placeholder="Enter a customer's phone number"
      value={mobileNumber}
      onChange={handleChange}
    />
    <button type="submit" onClick={handleSumbit}>Find</button>
    {reservations ? <ReservationList reservations={reservations} setUpdateReservations={setUpdateReservations}/> : null}
    {notFound ? <h4>No reservations found</h4> : null}
    </main>
  );
}
