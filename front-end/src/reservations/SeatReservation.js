import React, { useEffect, useState } from "react";
import {
  listAvailableTables,
  listReservation,
  updateTable,
} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import ReservationList from "./ReservationList";

function SeatReservation() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [selectedTableID, setSelectedTableID] = useState();
  const [reservation, setReservation] = useState(null);
  const { reservation_id } = useParams();
  const history = useHistory();

  async function addReservationToTable() {
    const abortController = new AbortController();
    try {
      await updateTable(
        Number(selectedTableID),
        reservation_id,
        abortController.signal
      );
      history.push(`/`);
    } catch (error) {
      setTablesError(error);
    }
    return ()=> abortController.abort();
  }

  function validateTable(e) {
    e.preventDefault();
    setTablesError(null);
    let errorString = "";
    const selectedTable = tables.find(
      (table) => table.table_id === Number(selectedTableID)
    );
    if (reservation.people > selectedTable.capacity) {
      errorString += `Table capacity must be greater than or equal to reservation size.`;
    }
    if(reservation.status === "seated") {
      errorString += `Reservation ${reservation.reservation_id} is already seated.`
    }
    errorString
      ? setTablesError({ message: errorString })
      : addReservationToTable();
  }

  function handleChange(e) {
    setSelectedTableID(e.target.value);
  }

  /*Load reservation list */
  useEffect(() => {
    const abortController = new AbortController();
    async function loadReservation() {
      try {
        const response = await listReservation(
          reservation_id,
          abortController.signal
        );
        setReservation(response);
      } catch (error) {
        setTablesError(error);
      }
    }
    loadReservation();
    return () => abortController.abort();
  }, [reservation_id]);

  

  /* Load available tables from DB */
  useEffect(() => {
    const abortController = new AbortController();
    async function loadAvailableTables() {
      try {
        const response = await listAvailableTables(abortController.signal);
        setTables(response);
      } catch (error) {
        setTablesError(error);
      }
    }

    loadAvailableTables();
    return () => abortController.abort();
  }, []);

  const options = tables.map((table) => {
    return (
      <option key={table.table_id} value={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    );
  });

  return (
    <main>
      <h1>Seat Reservation</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">{`Assign a table to reservation ${reservation_id}.`}</h4>
      </div>
      <ErrorAlert error={tablesError} />
      {reservation ? <ReservationList reservations={[reservation]} /> : null}
      <h4> Choose a table </h4>
      <form onSubmit={validateTable} onChange={handleChange}>
        <div className="form-group">
          <select className="form-control" name="table_id" value={selectedTableID} defaultValue="" required>
            <option value="">
              None
            </option>
            {options}
          </select>
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary" type="submit">Submit</button>
          <button className="btn btn-danger" type="button" onClick={() => history.goBack()}>
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}

export default SeatReservation;
