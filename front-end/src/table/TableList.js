import React, { useEffect, useState } from "react";
import { listTables } from "../utils/api";
import TableRow from "./TableRow";

function TableList() {

   const [tables, setTables] = useState([]);

   useEffect(()=>{

    const abortController = new AbortController();

    async function loadTables(){
        try {
            const response = await listTables(abortController.signal);
            setTables(response);
        } catch(error) {
            console.log(`Table Error!`)
        }
    }

    loadTables();

    return () => abortController.abort();
   }, [])

  const tableHeader = (
    <tr>
      <th>Table ID</th>
      <th>Table Name</th>
      <th>Table Capacity</th>
      <th>Status</th>
    </tr>
  );

  //return <h1>NULL</h1>

  const tableRows = tables.map((table) => {
    return (
      <TableRow
        key={table.table_id}
        table={table}
      />
    );
  });

  return (
    <table className="table table-striped table-hover">
      <caption>List of tables</caption>
      <thead>{tableHeader}</thead>
      <tbody>{tableRows}</tbody>
    </table>
  ); 
}

export default TableList;