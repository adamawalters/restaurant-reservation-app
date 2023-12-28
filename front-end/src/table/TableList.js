import React, { useEffect, useState } from "react";
import { listTables } from "../utils/api";
import TableRow from "./TableRow";

function TableList() {
  const [tables, setTables] = useState([]);
  const [updateTables, setUpdateTables] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadTables() {
      try {
        const response = await listTables(abortController.signal);
        setTables(response);
      } catch (error) {
        console.log(`Table Error!`);
      }
    }

    loadTables();

    return () => abortController.abort();
  }, [updateTables]);

  const tableHeader = (
    <tr>
      <th>Table ID</th>
      <th>Table Name</th>
      <th>Table Capacity</th>
      <th>Status</th>
      <th></th>
    </tr>
  );

  const tableRows = tables.map((table) => {
    return <TableRow key={table.table_id} table={table} setTables={setUpdateTables} />;
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
