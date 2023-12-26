import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "../reservations/ReservationList";
import ReservationListNav from "../ui-elements/ReservationListNav";
import useQuery from "../utils/useQuery";
import {
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { today } from "../utils/date-time";
import TableList from "../table/TableList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  const [reservations, setReservations] = useState(null);
  const [reservationsError, setReservationsError] = useState(null);
  const queryParams = useQuery();
  const history = useHistory();

  if (!queryParams.has("date")) {
    history.replace(`/dashboard?date=${today()}`);
    queryParams.set("date", today())
  }

  const [date, setDate] = useState(queryParams.get("date"));

  useEffect(() => {
    setReservations(null);
    const abortController = new AbortController();
    setReservationsError(null);

    async function loadDashboard() {
      try {
        const response = await listReservations(
          { date },
          abortController.signal
        );
        setReservations(response);
      } catch (error) {
        setReservationsError(error);
      }
    }

    loadDashboard();

    return () => abortController.abort();
  }, [date]);

  if (reservations) {
    return (
      <main style={{height: "100%", overflow: "hidden"}}>
        <h1>Dashboard</h1>
        <ErrorAlert error={reservationsError} />
        <div className="d-md-flex mb-3 justify-content-center">
          <h4 className="mb-0">Reservations for {date}</h4>
        </div>
        <ReservationListNav date={date} setDate={setDate} />
        <ReservationList reservations={reservations} />
        <div className="d-md-flex mb-3 justify-content-center">
          <h4 className="mb-0">Restaurant Table Status</h4>
        </div>
        <TableList />
      </main>
    );
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
     <ErrorAlert error={reservationsError} /> 
      <ReservationListNav date={date} setDate={setDate} />
      <div className="d-flex justify-content-center">
        <h2 className="font-italic">Reservations loading </h2>
      </div>
    </main>
  );

}



export default Dashboard;
