import React from "react";
import { previous, next, today } from "../utils/date-time";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ReservationListNav({ date, setDate }) {
  const history = useHistory();

  function incrementDate() {
    const nextDate = next(date);
    setDate(nextDate);
    history.push(`/dashboard?date=${nextDate}`);
  }

  function decrementDate() {
    const prevDate = previous(date);
    setDate(prevDate);
    history.push(`/dashboard?date=${prevDate}`);
  }

  function goToToday() {
    const todayDate = today();
    setDate(todayDate);
    history.push(`/dashboard?date=${todayDate}`);
  }

  const nav = (
    <div className="nav justify-content-between">
      <div className="wrapper">
        <span className="oi oi-arrow-left" />
        <button
          onClick={decrementDate}
          className="btn btn-link nav-link active d-inline"
          href="#"
        >
          Previous Day
        </button>
      </div>
      <div className="wrapper">
        <span className="oi oi-timer" />
        <button
          onClick={goToToday}
          className="btn btn-link nav-link d-inline"
          href="#"
        >
          Today
        </button>
      </div>
      <div className="wrapper">
      <span className="oi oi-arrow-right" />
        <button
          onClick={incrementDate}
          className="btn btn-link nav-link d-inline"
          href="#"
        >
          Next Day
        </button>
      </div>
    </div>
  );

  return nav;
}

export default ReservationListNav;
