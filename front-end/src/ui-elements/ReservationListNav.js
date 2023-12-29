import React from "react";
import { previous, next, today } from "../utils/date-time";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ReservationListNav({date, setDate}) {

  const history = useHistory();

  function incrementDate(){
    const nextDate = next(date);
    setDate(nextDate);
    history.push(`/dashboard?date=${nextDate}`);
  }

  function decrementDate(){
    const prevDate = previous(date);
    setDate(prevDate);
    history.push(`/dashboard?date=${prevDate}`);
  }

  function goToToday(){
    const todayDate = today();
    setDate(todayDate);
    history.push(`/dashboard?date=${todayDate}`)
  }

  const nav = (
    <div className="nav justify-content-between">
      <button  onClick={decrementDate} className="btn btn-link nav-link active" href="#">
        Previous
      </button>
      <button onClick={goToToday} className="btn btn-link nav-link" href="#">
        Today
      </button>
      <button onClick={incrementDate} className="btn btn-link nav-link" href="#">
        Next
      </button>
    </div>
  );

  return nav;
}

export default ReservationListNav;
