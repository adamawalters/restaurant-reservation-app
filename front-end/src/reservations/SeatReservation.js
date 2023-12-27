import React, { useEffect, useState } from "react";
import { listAvailableTables, listReservation, updateTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import ReservationList from "./ReservationList";

function SeatReservation() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [selectedTableID, setSelectedTableID] = useState();
  const [reservation, setReservation] = useState(null)
  const { reservation_id } = useParams();
  let submissionAbortController = new AbortController();

  async function addReservationToTable() {
    submissionAbortController.abort();
    submissionAbortController = new AbortController();
   try {
    const response = await updateTable(Number(selectedTableID), reservation_id, submissionAbortController.signal);
   } catch(error){
    setTablesError(error);
   }
  }

  function validateTable(e){
    e.preventDefault();
    setTablesError(null);
    let errorString = "";
    const selectedTable = tables.find((table) => table.table_id === Number(selectedTableID))
    if(reservation[0].people > selectedTable.capacity) {
        errorString +=`Table capacity must be greater than or equal to reservation size.`;
    } 
    errorString ? setTablesError({message: errorString}) : addReservationToTable();
  }

  function handleChange(e){
    setSelectedTableID(e.target.value);
  }

  useEffect(()=>{
    const abortController = new AbortController();
    async function loadReservations(){
        try {
            const response = await listReservation(reservation_id, abortController.signal);
            setReservation(response);
        } catch(error) {
            setTablesError(error)
        }
    }
    loadReservations();
    return () => abortController.abort();
  }, [reservation_id])

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
        <h4 className="mb-0">{`Assign a table to this reservation (reservation ${reservation_id}).`}</h4>
      </div>
      <ErrorAlert error={tablesError} />
      {reservation ? <ReservationList reservations={reservation}/> : null}
      <label htmlFor="table_id">Choose a Table</label>
      <form onSubmit={validateTable} onChange={handleChange}>
        <select name="table_id" value={selectedTableID} required>
          <option value="" selected>None</option>
          {options}
        </select>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default SeatReservation;
