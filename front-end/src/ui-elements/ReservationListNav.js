import React from "react";
import Button from "./Button";

function ReservationListNav() {

  const nav = (
    <div className="nav justify-content-between">
      <button className="btn btn-link nav-link active" href="#">
        Previous
      </button>
      <button className="btn btn-link nav-link" href="#">
        Today
      </button>
      <button className="btn btn-link nav-link" href="#">
        Next
      </button>
    </div>
  );

  return nav;
}

export default ReservationListNav;
