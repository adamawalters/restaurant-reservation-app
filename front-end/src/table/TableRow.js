import React from "react";
import { removeReservationFromTable } from "../utils/api";

function TableRow({ table, loadTables, loadReservations, setError }) {
  async function handleFinish(e) {
    const canFinish = window.confirm(
      `Is this table ready to seat new guests? This cannot be undone.`
    );
    if (canFinish) {
      try {
        await removeReservationFromTable(
          table.table_id,
        );
        await loadReservations();
        await loadTables();
      } catch (error) {
        setError(error);
      }
    }
  }

  const finishButton = (
    <button
      className="btn btn-primary"
      onClick={handleFinish}
      data-table-id-finish={table.table_id}
    >
      Finish
    </button>
  );

  return (
    <tr>
      <td className="align-middle">{table.table_id}</td>
      <td className="align-middle">{table.table_name}</td>
      <td className="align-middle">{table.capacity}</td>
      <td className="align-middle" data-table-id-status={table.table_id}>
        {table.reservation_id ? "Occupied" : "Free"}
      </td>
      <td className="align-middle">{table.reservation_id}</td>
      <td className="text-center align-middle">
        {table.reservation_id ? finishButton : null}
      </td>
    </tr>
  );
}

export default TableRow;
