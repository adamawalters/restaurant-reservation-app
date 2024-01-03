import React, { useEffect, useState } from "react";
import { listTables } from "../utils/api";
import TableRow from "./TableRow";

function TableList({loadReservations, setError}) {
  const [tables, setTables] = useState([]);

  useEffect(() => {

    const abortController = new AbortController();
    
    loadTables(abortController.signal);
    return () => abortController.abort();
  }, [setError]);


  async function loadTables(signal) {

    try {
      const response = await listTables(signal);
      setTables(response);
    } catch (error) {
      setError(error)
    }
  }


  const tableHeader = (
    <tr>
      <th>ID</th>
      <th>Table Name</th>
      <th>Table Capacity</th>
      <th>Status</th>
      <th>Reservation ID</th>
      <th></th>
    </tr>
  );

  const tableRows = tables.map((table) => {
    return <TableRow setError={setError} key={table.table_id} table={table} loadTables={loadTables} loadReservations={loadReservations} />;
  });

  return (
    <div style={{maxHeight: "250px", overflow: "auto"}}>
      <table
        className="table table-striped table-hover table-sm"
        style={{ height: "100px"}}
      >
        <caption>List of tables</caption>
        <thead>{tableHeader}</thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
}

export default TableList;
