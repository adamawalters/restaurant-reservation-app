import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function TableRow({ table }) {
  return (
    <tr>
      <td>{table.table_id}</td>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td data-table-id-status={table.table_id}>
        {table.reservation_id ? "Occupied" : "Free"}
      </td>
    </tr>
  );
}

export default TableRow;